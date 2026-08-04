import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateSchemeDto } from './dto/create-scheme.dto';

function generateSchemeNumber() {
  const year = new Date().getFullYear();
  const rand = Math.floor(100000 + Math.random() * 900000);
  return `SCH-${year}-${rand}`;
}

function addOneYear(date: Date) {
  const d = new Date(date);
  d.setFullYear(d.getFullYear() + 1);
  return d;
}

@Injectable()
export class SchemesService {
  constructor(private prisma: PrismaService) {}

  // Yearly plan, paid once - NOT an auto-renewing subscription.
  // endDate / renewalDate are computed as start + 1 year for the reminder job.
  createPending(dto: CreateSchemeDto) {
    const startDate = new Date(dto.startDate);
    const endDate = addOneYear(startDate);
    return this.prisma.annualScheme.create({
      data: {
        schemeNumber: generateSchemeNumber(),
        schemeName: dto.schemeName,
        poojaId: dto.poojaId,
        devoteeName: dto.devoteeName,
        nakshatra: dto.nakshatra,
        email: dto.email,
        phone: dto.phone,
        address: dto.address,
        amount: dto.amount,
        startDate,
        endDate,
        renewalDate: endDate,
        status: 'PENDING_PAYMENT',
      },
    });
  }

  findAllAdmin() {
    return this.prisma.annualScheme.findMany({
      include: { payment: true, receipt: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string) {
    const scheme = await this.prisma.annualScheme.findUnique({
      where: { id },
      include: { payment: true, receipt: true },
    });
    if (!scheme) throw new NotFoundException('Scheme not found');
    return scheme;
  }

  // Schemes whose renewal date is within the next N days and haven't been
  // reminded yet - intended to be called from a scheduled cron job.
  findDueForReminder(daysAhead = 15) {
    const now = new Date();
    const threshold = new Date(now.getTime() + daysAhead * 24 * 60 * 60 * 1000);
    return this.prisma.annualScheme.findMany({
      where: {
        reminderSent: false,
        renewalDate: { lte: threshold, gte: now },
        status: { in: ['CONFIRMED', 'SCHEDULED', 'COMPLETED'] },
      },
    });
  }

  markReminderSent(id: string) {
    return this.prisma.annualScheme.update({ where: { id }, data: { reminderSent: true } });
  }
}
