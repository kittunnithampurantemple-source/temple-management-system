import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

function startOfDay(d = new Date()) {
  const x = new Date(d); x.setHours(0, 0, 0, 0); return x;
}
function startOfMonth(d = new Date()) {
  return new Date(d.getFullYear(), d.getMonth(), 1);
}

@Injectable()
export class AdminService {
  constructor(private prisma: PrismaService) {}

  async getDashboardOverview() {
    const today = startOfDay();
    const monthStart = startOfMonth();

    const [
      todayBookingRevenue,
      todayDonationRevenue,
      monthBookingRevenue,
      monthDonationRevenue,
      totalDonations,
      totalBookings,
      pendingPoojas,
      completedPoojas,
    ] = await Promise.all([
      this.prisma.payment.aggregate({
        _sum: { amount: true },
        where: { status: 'SUCCESS', bookingId: { not: null }, createdAt: { gte: today } },
      }),
      this.prisma.payment.aggregate({
        _sum: { amount: true },
        where: { status: 'SUCCESS', donationId: { not: null }, createdAt: { gte: today } },
      }),
      this.prisma.payment.aggregate({
        _sum: { amount: true },
        where: { status: 'SUCCESS', bookingId: { not: null }, createdAt: { gte: monthStart } },
      }),
      this.prisma.payment.aggregate({
        _sum: { amount: true },
        where: { status: 'SUCCESS', donationId: { not: null }, createdAt: { gte: monthStart } },
      }),
      this.prisma.donation.aggregate({ _sum: { amount: true } }),
      this.prisma.booking.count(),
      this.prisma.booking.count({ where: { status: { in: ['PENDING_PAYMENT', 'CONFIRMED', 'SCHEDULED'] } } }),
      this.prisma.booking.count({ where: { status: 'COMPLETED' } }),
    ]);

    return {
      todayRevenue:
        Number(todayBookingRevenue._sum.amount || 0) + Number(todayDonationRevenue._sum.amount || 0),
      monthlyRevenue:
        Number(monthBookingRevenue._sum.amount || 0) + Number(monthDonationRevenue._sum.amount || 0),
      totalDonations: Number(totalDonations._sum.amount || 0),
      totalBookings,
      pendingPoojas,
      completedPoojas,
    };
  }
}
