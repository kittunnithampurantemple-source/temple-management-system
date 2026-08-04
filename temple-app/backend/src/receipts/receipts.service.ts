import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { StorageService } from './storage.abstraction';
import { buildReceiptPdf } from './pdf-generator';

function generateReceiptNumber() {
  const year = new Date().getFullYear();
  const rand = Math.floor(100000 + Math.random() * 900000);
  return `RCPT-${year}-${rand}`;
}

@Injectable()
export class ReceiptsService {
  constructor(private prisma: PrismaService, private storage: StorageService) {}

  async generateForBooking(bookingId: string) {
    const booking = await this.prisma.booking.findUnique({
      where: { id: bookingId },
      include: { pooja: true, payment: true },
    });
    if (!booking) throw new NotFoundException('Booking not found');

    const receiptNumber = generateReceiptNumber();
    const pdf = await buildReceiptPdf({
      receiptNumber,
      referenceNumber: booking.bookingNumber,
      referenceLabel: 'Booking Number',
      payerName: booking.devoteeName,
      itemName: booking.pooja.nameEn,
      amount: Number(booking.amount),
      date: new Date(),
      transactionId: booking.payment?.razorpayPaymentId || booking.payment?.offlineReference || 'OFFLINE',
    });

    const key = `receipts/${receiptNumber}.pdf`;
    await this.storage.save(key, pdf);

    return this.prisma.receipt.upsert({
      where: { bookingId },
      update: { pdfPath: key },
      create: { receiptNumber, receiptType: 'POOJA_BOOKING', bookingId, pdfPath: key },
    });
  }

  async generateForScheme(schemeId: string) {
    const scheme = await this.prisma.annualScheme.findUnique({
      where: { id: schemeId },
      include: { payment: true },
    });
    if (!scheme) throw new NotFoundException('Scheme not found');

    const receiptNumber = generateReceiptNumber();
    const pdf = await buildReceiptPdf({
      receiptNumber,
      referenceNumber: scheme.schemeNumber,
      referenceLabel: 'Scheme Number',
      payerName: scheme.devoteeName,
      itemName: scheme.schemeName,
      amount: Number(scheme.amount),
      date: new Date(),
      transactionId: scheme.payment?.razorpayPaymentId || 'OFFLINE',
    });

    const key = `receipts/${receiptNumber}.pdf`;
    await this.storage.save(key, pdf);

    return this.prisma.receipt.upsert({
      where: { annualSchemeId: schemeId },
      update: { pdfPath: key },
      create: { receiptNumber, receiptType: 'ANNUAL_SCHEME', annualSchemeId: schemeId, pdfPath: key },
    });
  }

  async generateForDonation(donationId: string) {
    const donation = await this.prisma.donation.findUnique({
      where: { id: donationId },
      include: { payment: true },
    });
    if (!donation) throw new NotFoundException('Donation not found');

    const receiptNumber = generateReceiptNumber();
    const pdf = await buildReceiptPdf({
      receiptNumber,
      referenceNumber: donation.donationNumber,
      referenceLabel: 'Donation Number',
      payerName: donation.donorName,
      itemName: `${donation.donationType} Donation`,
      amount: Number(donation.amount),
      date: new Date(),
      transactionId: donation.payment?.razorpayPaymentId || donation.payment?.offlineReference || 'OFFLINE',
    });

    const key = `receipts/${receiptNumber}.pdf`;
    await this.storage.save(key, pdf);

    return this.prisma.receipt.upsert({
      where: { donationId },
      update: { pdfPath: key },
      create: { receiptNumber, receiptType: 'DONATION', donationId, pdfPath: key },
    });
  }

  async getPdfBuffer(receiptId: string) {
    const receipt = await this.prisma.receipt.findUnique({ where: { id: receiptId } });
    if (!receipt || !receipt.pdfPath) throw new NotFoundException('Receipt not found');
    const fs = require('fs');
    return fs.readFileSync(this.storage.getAbsolutePath(receipt.pdfPath));
  }

  async reprint(receiptId: string) {
    const receipt = await this.prisma.receipt.update({
      where: { id: receiptId },
      data: { reprintCount: { increment: 1 } },
    });
    return receipt;
  }
}
