import { IsDateString, IsEmail, IsOptional, IsString } from 'class-validator';

export class CreateBookingDto {
  @IsString() poojaId: string;
  @IsDateString() poojaDate: string;

  @IsString() devoteeName: string;
  @IsOptional() @IsString() nakshatra?: string;
  @IsEmail() email: string;
  @IsString() phone: string;
  @IsOptional() @IsString() address?: string;
}
