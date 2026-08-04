import { IsEnum, IsString } from 'class-validator';

export enum PaymentSourceType {
  BOOKING = 'BOOKING',
  ANNUAL_SCHEME = 'ANNUAL_SCHEME',
  DONATION = 'DONATION',
}

export class CreateOrderDto {
  @IsEnum(PaymentSourceType) sourceType: PaymentSourceType;
  @IsString() sourceId: string; // bookingId | annualSchemeId | donationId
}
