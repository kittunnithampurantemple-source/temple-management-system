import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { SchemesService } from './schemes.service';
import { CreateSchemeDto } from './dto/create-scheme.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';

@Controller('schemes')
export class SchemesController {
  constructor(private schemesService: SchemesService) {}

  @Post()
  createPending(@Body() dto: CreateSchemeDto) {
    return this.schemesService.createPending(dto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) { return this.schemesService.findOne(id); }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN', 'STAFF')
  @Get()
  findAll() { return this.schemesService.findAllAdmin(); }
}
