import { IsEmail, IsEnum, IsNumber, IsOptional, IsString, Min } from 'class-validator';
import { DonationType } from '@prisma/client';

export class CreateDonationDto {
  @IsEnum(DonationType) donationType: DonationType;
  @IsString() donorName: string;
  @IsOptional() @IsEmail() email?: string;
  @IsOptional() @IsString() phone?: string;
  @IsOptional() @IsString() address?: string;
  @IsOptional() @IsString() panNumber?: string;
  @IsNumber() @Min(1) amount: number;
  @IsOptional() @IsString() message?: string;
}
