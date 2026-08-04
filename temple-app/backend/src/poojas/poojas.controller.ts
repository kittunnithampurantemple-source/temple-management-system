import { Body, Controller, Get, Param, Patch, Post, Delete, UseGuards } from '@nestjs/common';
import { PoojasService } from './poojas.service';
import { CreatePoojaDto } from './dto/create-pooja.dto';
import { UpdatePoojaDto } from './dto/update-pooja.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';

@Controller('poojas')
export class PoojasController {
  constructor(private poojasService: PoojasService) {}

  // ---- Public ----
  @Get() findAllPublic() { return this.poojasService.findAllPublic(); }
  @Get(':id') findOne(@Param('id') id: string) { return this.poojasService.findOne(id); }

  // ---- Admin ----
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN', 'STAFF')
  @Get('admin/all')
  findAllAdmin() { return this.poojasService.findAllAdmin(); }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @Post()
  create(@Body() dto: CreatePoojaDto) { return this.poojasService.create(dto); }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdatePoojaDto) {
    return this.poojasService.update(id, dto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @Delete(':id')
  remove(@Param('id') id: string) { return this.poojasService.remove(id); }
}
