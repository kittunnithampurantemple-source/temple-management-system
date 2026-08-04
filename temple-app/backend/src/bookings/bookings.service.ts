import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { CreateOfflineBookingDto } from './dto/create-offline-booking.dto';
import { UpdateBookingStatusDto } from './dto/update-booking-status.dto';
import { NotificationsService } from '../notifications/notifications.service';
import { ReceiptsService } from '../receipts/receipts.service';

function generateBookingNumber() {
  const year = new Date().getFullYear();
  const rand = Math.floor(100000 + Math.random() * 900000);
  return `TMP-${year}-${rand}`;
}

@Injectable()
export class BookingsService {
  constructor(
    private prisma: PrismaService,
    private notifications: NotificationsService,
    private receipts: ReceiptsService,
  ) {}

  // Step 1 of online flow: create a PENDING_PAYMENT booking, return it so the
  // frontend can then call /payments/razorpay/order with bookingId.
  async createPendingBooking(dto: CreateBookingDto) {
    const pooja = await this.prisma.pooja.findUnique({ where: { id: dto.poojaId } });
    if (!pooja || !pooja.isActive || !pooja.isAvailable) {
      throw new BadRequestException('Selected pooja is not available for booking');
    }

    return this.prisma.booking.create({
      data: {
        bookingNumber: generateBookingNumber(),
        poojaId: dto.poojaId,
        poojaDate: new Date(dto.poojaDate),
        devoteeName: dto.devoteeName,
        nakshatra: dto.nakshatra,
        email: dto.email,
        phone: dto.phone,
        address: dto.address,
        amount: pooja.price,
        status: 'PENDING_PAYMENT',
      },
      include: { pooja: true },
    });
  }

  // Admin offline counter booking - no Razorpay involved, payment + receipt
  // created immediately as CONFIRMED.
  async createOfflineBooking(dto: CreateOfflineBookingDto, createdByUserId: string) {
    const pooja = await this.prisma.pooja.findUnique({ where: { id: dto.poojaId } });
    if (!pooja) throw new NotFoundException('Pooja not found');

    const booking = await this.prisma.booking.create({
      data: {
        bookingNumber: generateBookingNumber(),
        poojaId: dto.poojaId,
        poojaDate: new Date(dto.poojaDate),
        devoteeName: dto.devoteeName,
        nakshatra: dto.nakshatra,
        email: dto.email,
        phone: dto.phone,
        address: dto.address,
        amount: pooja.price,
        status: 'CONFIRMED',
        isOfflineBooking: true,
        createdByUserId,
      },
    });

    await this.prisma.payment.create({
      data: {
        bookingId: booking.id,
        method: dto.paymentMethod,
        status: 'SUCCESS',
        amount: pooja.price,
        offlineReference: dto.offlineReference,
      },
    });

    const receipt = await this.receipts.generateForBooking(booking.id);
    return { booking, receipt };
  }

  findAllAdmin(filters: { status?: string; from?: string; to?: string } = {}) {
    return this.prisma.booking.findMany({
      where: {
        status: filters.status ? (filters.status as any) : undefined,
        poojaDate:
          filters.from || filters.to
            ? {
                gte: filters.from ? new Date(filters.from) : undefined,
                lte: filters.to ? new Date(filters.to) : undefined,
              }
            : undefined,
      },
      include: { pooja: true, payment: true, receipt: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string) {
    const booking = await this.prisma.booking.findUnique({
      where: { id },
      include: { pooja: true, payment: true, receipt: true },
    });
    if (!booking) throw new NotFoundException('Booking not found');
    return booking;
  }

  findByBookingNumber(bookingNumber: string) {
    return this.prisma.booking.findUnique({
      where: { bookingNumber },
      include: { pooja: true, payment: true, receipt: true },
    });
  }

  async updateStatus(id: string, dto: UpdateBookingStatusDto) {
    const booking = await this.findOne(id);
    const updated = await this.prisma.booking.update({
      where: { id },
      data: { status: dto.status },
      include: { pooja: true },
    });

    if (dto.status === 'COMPLETED') {
      await this.notifications.sendBookingCompletedEmail(updated);
    }
    return updated;
  }
}
