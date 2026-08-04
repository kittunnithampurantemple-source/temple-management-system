import { IsDateString, IsEmail, IsEnum, IsOptional, IsString } from 'class-validator';
import { PaymentMethod } from '@prisma/client';

export class CreateOfflineBookingDto {
  @IsString() poojaId: string;
  @IsDateString() poojaDate: string;

  @IsString() devoteeName: string;
  @IsOptional() @IsString() nakshatra?: string;
  @IsEmail() email: string;
  @IsString() phone: string;
  @IsOptional() @IsString() address?: string;

  @IsEnum(PaymentMethod) paymentMethod: PaymentMethod; // CASH | COUNTER_UPI | BANK_TRANSFER | CHEQUE
  @IsOptional() @IsString() offlineReference?: string;
}
