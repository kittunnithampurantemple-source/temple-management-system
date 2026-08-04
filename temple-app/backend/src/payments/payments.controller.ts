import { Body, Controller, Headers, Post, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { Request } from 'express';
import { PaymentsService } from './payments.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { VerifyPaymentDto } from './dto/verify-payment.dto';

@Controller('payments')
export class PaymentsController {
  constructor(private paymentsService: PaymentsService) {}

  @UseGuards(JwtAuthGuard)
  @Post('razorpay/order')
  createOrder(@Body() dto: CreateOrderDto) {
    return this.paymentsService.createOrder(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Post('razorpay/verify')
  verify(@Body() dto: VerifyPaymentDto) {
    return this.paymentsService.verifyPayment(dto);
  }

  // NOTE: this route must receive the RAW request body for signature
  // verification. See main.ts / webhook raw-body middleware notes in README.
  @Post('razorpay/webhook')
  webhook(@Req() req: Request, @Headers('x-razorpay-signature') signature: string) {
    return this.paymentsService.handleWebhook((req as any).rawBody, signature);
  }
}
