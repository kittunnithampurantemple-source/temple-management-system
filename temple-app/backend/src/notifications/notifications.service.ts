import { Injectable, Logger } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class NotificationsService {
  private readonly logger = new Logger('NotificationsService');
  private transporter;

  constructor(private prisma: PrismaService) {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587,
      secure: process.env.SMTP_SECURE === 'true',
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
    });
  }

  private async sendAndLog(to: string, subject: string, html: string) {
    const notification = await this.prisma.notification.create({
      data: { type: 'EMAIL', recipient: to, subject, body: html, status: 'PENDING' },
    });
    try {
      await this.transporter.sendMail({
        from: `"${process.env.SMTP_FROM_NAME}" <${process.env.SMTP_FROM_EMAIL}>`,
        to,
        subject,
        html,
      });
      await this.prisma.notification.update({
        where: { id: notification.id },
        data: { status: 'SENT', sentAt: new Date() },
      });
    } catch (err: any) {
      this.logger.error(`Email to ${to} failed: ${err.message}`);
      await this.prisma.notification.update({
        where: { id: notification.id },
        data: { status: 'FAILED', error: err.message },
      });
    }
  }

  async sendBookingConfirmedEmail(booking: any, receipt: any) {
    const subject = `Booking Confirmed - ${booking.bookingNumber}`;
    const html = `
      <h2>Your pooja booking is confirmed</h2>
      <p>Dear ${booking.devoteeName},</p>
      <p>Your booking <b>${booking.bookingNumber}</b> for <b>${booking.pooja.nameEn}</b>
      on ${new Date(booking.poojaDate).toLocaleDateString('en-IN')} has been confirmed.</p>
      <p>Your receipt is attached and also downloadable from the website using receipt id: ${receipt.id}</p>
      <p>${process.env.TEMPLE_NAME}</p>
    `;
    await this.sendAndLog(booking.email, subject, html);
  }

  async sendBookingCompletedEmail(booking: any) {
    const subject = `Pooja Completed - ${booking.bookingNumber}`;
    const html = `
      <h2>Your pooja has been performed</h2>
      <p>Dear ${booking.devoteeName},</p>
      <p>Your pooja <b>${booking.pooja.nameEn}</b> (Booking ${booking.bookingNumber}) has been completed.</p>
      <p>${process.env.TEMPLE_NAME}</p>
    `;
    await this.sendAndLog(booking.email, subject, html);
  }

  async sendDonationReceiptEmail(donationId: string, receipt: any) {
    const donation = await this.prisma.donation.findUnique({ where: { id: donationId } });
    if (!donation || !donation.email) return;
    const subject = `Thank you for your donation - ${donation.donationNumber}`;
    const html = `
      <h2>Thank you for your generous donation</h2>
      <p>Dear ${donation.donorName},</p>
      <p>We have received your donation of Rs. ${Number(donation.amount).toFixed(2)}
      (Reference: ${donation.donationNumber}).</p>
      <p>Your receipt id is: ${receipt.id}</p>
      <p>${process.env.TEMPLE_NAME}</p>
    `;
    await this.sendAndLog(donation.email, subject, html);
  }

  async sendSchemeRenewalReminder(scheme: any) {
    const subject = `Renewal Reminder - ${scheme.schemeName}`;
    const html = `
      <h2>Your annual scheme is due for renewal</h2>
      <p>Dear ${scheme.devoteeName},</p>
      <p>Your scheme <b>${scheme.schemeName}</b> (${scheme.schemeNumber}) is due for renewal on
      ${new Date(scheme.renewalDate).toLocaleDateString('en-IN')}. Please visit the temple website to renew.</p>
      <p>${process.env.TEMPLE_NAME}</p>
    `;
    await this.sendAndLog(scheme.email, subject, html);
  }

  async sendPasswordResetEmail(email: string, token: string) {
    const resetUrl = `${process.env.FRONTEND_URL || 'http://localhost:3000'}/reset-password?token=${token}`;
    const subject = `Password Reset Request`;
    const html = `
      <h2>Reset your password</h2>
      <p>Dear Devotee,</p>
      <p>We received a request to reset your password. Click the link below to set a new password:</p>
      <p><a href="${resetUrl}">${resetUrl}</a></p>
      <p>If you didn't request this, please safely ignore this email. The link will expire in 1 hour.</p>
      <p>Regards,<br/>Sree Temple Trust</p>
    `;
    await this.sendAndLog(email, subject, html);
    this.logger.log(`Password reset email triggered for ${email}`);
    this.logger.debug(`[DEV FALLBACK] Password Reset Link: ${resetUrl}`);
  }
}
