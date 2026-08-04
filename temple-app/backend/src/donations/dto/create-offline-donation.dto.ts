import { CreateDonationDto } from './create-donation.dto';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { PaymentMethod } from '@prisma/client';

export class CreateOfflineDonationDto extends CreateDonationDto {
  @IsEnum(PaymentMethod) paymentMethod: PaymentMethod;
  @IsOptional() @IsString() offlineReference?: string;
}
