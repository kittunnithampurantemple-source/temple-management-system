import { IsBoolean, IsInt, IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class CreatePoojaDto {
  @IsString() name: string;       // Malayalam
  @IsString() nameEn: string;     // English

  @IsOptional() @IsString() description?: string;

  @IsNumber() @Min(0) price: number;

  @IsOptional() @IsInt() @Min(1) durationMinutes?: number;

  @IsOptional() @IsString() imageUrl?: string;

  @IsOptional() @IsBoolean() isAvailable?: boolean;
  @IsOptional() @IsBoolean() isActive?: boolean;
  @IsOptional() @IsInt() sortOrder?: number;
}
