import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import PDFDocument from 'pdfkit';
import * as XLSX from 'xlsx';

@Injectable()
export class ReportsService {
  constructor(private prisma: PrismaService) {}

  private async getRevenueRows(from: Date, to: Date) {
    const bookings = await this.prisma.booking.findMany({
      where: { createdAt: { gte: from, lte: to }, payment: { status: 'SUCCESS' } },
      include: { pooja: true, payment: true },
    });
    const donations = await this.prisma.donation.findMany({
      where: { createdAt: { gte: from, lte: to }, payment: { status: 'SUCCESS' } },
      include: { payment: true },
    });
    return { bookings, donations };
  }

  async getSummary(from: string, to: string) {
    const fromDate = new Date(from);
    const toDate = new Date(to);
    const { bookings, donations } = await this.getRevenueRows(fromDate, toDate);

    const poojaRevenue = bookings.reduce((sum, b) => sum + Number(b.amount), 0);
    const donationRevenue = donations.reduce((sum, d) => sum + Number(d.amount), 0);

    return {
      range: { from, to },
      poojaRevenue,
      donationRevenue,
      totalRevenue: poojaRevenue + donationRevenue,
      bookingCount: bookings.length,
      donationCount: donations.length,
    };
  }

  async exportExcel(from: string, to: string): Promise<Buffer> {
    const { bookings, donations } = await this.getRevenueRows(new Date(from), new Date(to));

    const bookingRows = bookings.map((b) => ({
      BookingNumber: b.bookingNumber,
      Pooja: b.pooja.nameEn,
      Devotee: b.devoteeName,
      Amount: Number(b.amount),
      Status: b.status,
      Date: b.poojaDate.toISOString().slice(0, 10),
    }));
    const donationRows = donations.map((d) => ({
      DonationNumber: d.donationNumber,
      Type: d.donationType,
      Donor: d.donorName,
      Amount: Number(d.amount),
      Date: d.createdAt.toISOString().slice(0, 10),
    }));

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(bookingRows), 'Poojas');
    XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(donationRows), 'Donations');

    return XLSX.write(wb, { type: 'buffer', bookType: 'xlsx' });
  }

  async exportPdf(from: string, to: string): Promise<Buffer> {
    const summary = await this.getSummary(from, to);
    return new Promise((resolve, reject) => {
      const doc = new PDFDocument({ margin: 40 });
      const chunks: Buffer[] = [];
      doc.on('data', (c) => chunks.push(c));
      doc.on('end', () => resolve(Buffer.concat(chunks)));
      doc.on('error', reject);

      doc.fontSize(16).text(`${process.env.TEMPLE_NAME || 'Temple'} - Revenue Report`, { align: 'center' });
      doc.fontSize(10).text(`Period: ${from} to ${to}`, { align: 'center' });
      doc.moveDown();
      doc.fontSize(12).text(`Pooja Revenue: Rs. ${summary.poojaRevenue.toFixed(2)} (${summary.bookingCount} bookings)`);
      doc.text(`Donation Revenue: Rs. ${summary.donationRevenue.toFixed(2)} (${summary.donationCount} donations)`);
      doc.text(`Total Revenue: Rs. ${summary.totalRevenue.toFixed(2)}`);
      doc.end();
    });
  }
}
