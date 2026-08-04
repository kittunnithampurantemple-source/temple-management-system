import { BadRequestException, Injectable, NotFoundException, Logger } from '@nestjs/common';
import * as crypto from 'crypto';
import Razorpay from 'razorpay';
import { PrismaService } from '../prisma/prisma.service';
import { CreateOrderDto, PaymentSourceType } from './dto/create-order.dto';
import { VerifyPaymentDto } from './dto/verify-payment.dto';
import { ReceiptsService } from '../receipts/receipts.service';
import { NotificationsService } from '../notifications/notifications.service';

@Injectable()
export class PaymentsService {
  private readonly logger = new Logger('PaymentsService');
  private razorpay: Razorpay;

  constructor(
    private prisma: PrismaService,
    private receipts: ReceiptsService,
    private notifications: NotificationsService,
  ) {
    this.razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });
  }

  /**
   * Creates a Razorpay order for a booking / annual scheme / donation.
   * The frontend only ever receives an order id + amount + key id - it
   * NEVER decides the amount; that always comes from our own DB record.
   */
  async createOrder(dto: CreateOrderDto) {
    const { amount, paymentLinkData } = await this.resolveSourceAmount(dto);

    const order = await this.razorpay.orders.create({
      amount: Math.round(amount * 100), // paise
      currency: 'INR',
      receipt: `${dto.sourceType}_${dto.sourceId}`.slice(0, 40),
      notes: { sourceType: dto.sourceType, sourceId: dto.sourceId },
    });

    const paymentData: any = {
      method: 'RAZORPAY',
      status: 'CREATED',
      amount,
      razorpayOrderId: order.id,
    };
    if (dto.sourceType === PaymentSourceType.BOOKING) paymentData.bookingId = dto.sourceId;
    if (dto.sourceType === PaymentSourceType.ANNUAL_SCHEME) paymentData.annualSchemeId = dto.sourceId;
    if (dto.sourceType === PaymentSourceType.DONATION) paymentData.donationId = dto.sourceId;

    await this.prisma.payment.upsert({
      where: { razorpayOrderId: order.id },
      update: paymentData,
      create: paymentData,
    });

    return {
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      keyId: process.env.RAZORPAY_KEY_ID,
      ...paymentLinkData,
    };
  }

  private async resolveSourceAmount(dto: CreateOrderDto) {
    if (dto.sourceType === PaymentSourceType.BOOKING) {
      const booking = await this.prisma.booking.findUnique({ where: { id: dto.sourceId } });
      if (!booking) throw new NotFoundException('Booking not found');
      return { amount: Number(booking.amount), paymentLinkData: { bookingNumber: booking.bookingNumber } };
    }
    if (dto.sourceType === PaymentSourceType.ANNUAL_SCHEME) {
      const scheme = await this.prisma.annualScheme.findUnique({ where: { id: dto.sourceId } });
      if (!scheme) throw new NotFoundException('Scheme not found');
      return { amount: Number(scheme.amount), paymentLinkData: { schemeNumber: scheme.schemeNumber } };
    }
    const donation = await this.prisma.donation.findUnique({ where: { id: dto.sourceId } });
    if (!donation) throw new NotFoundException('Donation not found');
    return { amount: Number(donation.amount), paymentLinkData: { donationNumber: donation.donationNumber } };
  }

  /**
   * Called by the frontend right after Razorpay checkout succeeds client-side.
   * We NEVER trust that success signal alone - we re-verify the HMAC signature
   * here using our key secret before marking anything as paid.
   */
  async verifyPayment(dto: VerifyPaymentDto) {
    const body = `${dto.razorpay_order_id}|${dto.razorpay_payment_id}`;
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET as string)
      .update(body)
      .digest('hex');

    if (expectedSignature !== dto.razorpay_signature) {
      throw new BadRequestException('Payment signature verification failed');
    }

    const payment = await this.prisma.payment.findUnique({
      where: { razorpayOrderId: dto.razorpay_order_id },
    });
    if (!payment) throw new NotFoundException('Payment record not found');

    return this.markPaymentSuccess(payment.id, dto.razorpay_payment_id, dto.razorpay_signature);
  }

  private async markPaymentSuccess(paymentId: string, razorpayPaymentId: string, signature: string) {
    const payment = await this.prisma.payment.update({
      where: { id: paymentId },
      data: { status: 'SUCCESS', razorpayPaymentId, razorpaySignature: signature },
    });

    if (payment.bookingId) {
      const booking = await this.prisma.booking.update({
        where: { id: payment.bookingId },
        data: { status: 'CONFIRMED' },
        include: { pooja: true },
      });
      const receipt = await this.receipts.generateForBooking(booking.id);
      await this.notifications.sendBookingConfirmedEmail(booking, receipt);
    }

    if (payment.annualSchemeId) {
      const scheme = await this.prisma.annualScheme.update({
        where: { id: payment.annualSchemeId },
        data: { status: 'CONFIRMED' },
      });
      await this.receipts.generateForScheme(scheme.id);
    }

    if (payment.donationId) {
      await this.prisma.donation.update({ where: { id: payment.donationId }, data: {} });
      const receipt = await this.receipts.generateForDonation(payment.donationId);
      await this.notifications.sendDonationReceiptEmail(payment.donationId, receipt);
    }

    return { success: true, paymentId: payment.id };
  }

  /**
   * Razorpay webhook - the authoritative source of truth, independent of
   * whatever the browser tells us. Verifies the X-Razorpay-Signature header
   * against the raw body using the separate webhook secret.
   */
  async handleWebhook(rawBody: Buffer, signatureHeader: string) {
    const expected = crypto
      .createHmac('sha256', process.env.RAZORPAY_WEBHOOK_SECRET as string)
      .update(rawBody)
      .digest('hex');

    if (expected !== signatureHeader) {
      this.logger.warn('Webhook signature mismatch - rejecting');
      throw new BadRequestException('Invalid webhook signature');
    }

    const event = JSON.parse(rawBody.toString());
    const orderId = event?.payload?.payment?.entity?.order_id;
    const paymentId = event?.payload?.payment?.entity?.id;

    if (event.event === 'payment.captured' && orderId) {
      const payment = await this.prisma.payment.findUnique({ where: { razorpayOrderId: orderId } });
      if (payment && payment.status !== 'SUCCESS') {
        await this.prisma.payment.update({
          where: { id: payment.id },
          data: { rawWebhookPayload: event },
        });
        await this.markPaymentSuccess(payment.id, paymentId, 'webhook-verified');
      }
    }

    if (event.event === 'payment.failed' && orderId) {
      const payment = await this.prisma.payment.findUnique({ where: { razorpayOrderId: orderId } });
      if (payment) {
        await this.prisma.payment.update({
          where: { id: payment.id },
          data: { status: 'FAILED', rawWebhookPayload: event },
        });
      }
    }

    return { received: true };
  }
}
