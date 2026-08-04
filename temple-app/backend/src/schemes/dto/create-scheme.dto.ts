import { IsDateString, IsEmail, IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class CreateSchemeDto {
  @IsString() schemeName: string;
  @IsOptional() @IsString() poojaId?: string;
  @IsString() devoteeName: string;
  @IsOptional() @IsString() nakshatra?: string;
  @IsEmail() email: string;
  @IsString() phone: string;
  @IsOptional() @IsString() address?: string;
  @IsNumber() @Min(1) amount: number;
  @IsDateString() startDate: string;
}
