import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateDonationDto } from './dto/create-donation.dto';
import { CreateOfflineDonationDto } from './dto/create-offline-donation.dto';
import { ReceiptsService } from '../receipts/receipts.service';

function generateDonationNumber() {
  const year = new Date().getFullYear();
  const rand = Math.floor(100000 + Math.random() * 900000);
  return `DON-${year}-${rand}`;
}

@Injectable()
export class DonationsService {
  constructor(private prisma: PrismaService, private receipts: ReceiptsService) {}

  // Step 1 of online flow - create the donation record, frontend then
  // creates a Razorpay order against it.
  createPending(dto: CreateDonationDto) {
    return this.prisma.donation.create({
      data: { ...dto, donationNumber: generateDonationNumber() },
    });
  }

  async createOffline(dto: CreateOfflineDonationDto, recordedByUserId: string) {
    const { paymentMethod, offlineReference, ...donationData } = dto;
    const donation = await this.prisma.donation.create({
      data: {
        ...donationData,
        donationNumber: generateDonationNumber(),
        recordedByUserId,
      },
    });

    await this.prisma.payment.create({
      data: {
        donationId: donation.id,
        method: paymentMethod,
        status: 'SUCCESS',
        amount: dto.amount,
        offlineReference,
      },
    });

    const receipt = await this.receipts.generateForDonation(donation.id);
    return { donation, receipt };
  }

  findAllAdmin(filters: { donationType?: string; from?: string; to?: string } = {}) {
    return this.prisma.donation.findMany({
      where: {
        donationType: filters.donationType ? (filters.donationType as any) : undefined,
        createdAt:
          filters.from || filters.to
            ? {
                gte: filters.from ? new Date(filters.from) : undefined,
                lte: filters.to ? new Date(filters.to) : undefined,
              }
            : undefined,
      },
      include: { payment: true, receipt: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string) {
    const donation = await this.prisma.donation.findUnique({
      where: { id },
      include: { payment: true, receipt: true },
    });
    if (!donation) throw new NotFoundException('Donation not found');
    return donation;
  }
}
