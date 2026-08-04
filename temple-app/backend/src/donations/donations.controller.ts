import { Body, Controller, Get, Param, Post, Query, UseGuards } from '@nestjs/common';
import { DonationsService } from './donations.service';
import { CreateDonationDto } from './dto/create-donation.dto';
import { CreateOfflineDonationDto } from './dto/create-offline-donation.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { CurrentUser } from '../common/decorators/current-user.decorator';

@Controller('donations')
export class DonationsController {
  constructor(private donationsService: DonationsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  createPending(@Body() dto: CreateDonationDto) {
    return this.donationsService.createPending(dto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN', 'STAFF')
  @Post('offline')
  createOffline(@Body() dto: CreateOfflineDonationDto, @CurrentUser('userId') userId: string) {
    return this.donationsService.createOffline(dto, userId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN', 'STAFF')
  @Get()
  findAll(
    @Query('donationType') donationType?: string,
    @Query('from') from?: string,
    @Query('to') to?: string,
  ) {
    return this.donationsService.findAllAdmin({ donationType, from, to });
  }

  @Get(':id')
  findOne(@Param('id') id: string) { return this.donationsService.findOne(id); }
}
