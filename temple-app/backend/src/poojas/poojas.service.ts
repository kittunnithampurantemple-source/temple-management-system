import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePoojaDto } from './dto/create-pooja.dto';
import { UpdatePoojaDto } from './dto/update-pooja.dto';

@Injectable()
export class PoojasService {
  constructor(private prisma: PrismaService) {}

  // Public: only active + available poojas, ordered for display
  findAllPublic() {
    return this.prisma.pooja.findMany({
      where: { isActive: true },
      orderBy: { sortOrder: 'asc' },
    });
  }

  // Admin: everything
  findAllAdmin() {
    return this.prisma.pooja.findMany({ orderBy: { sortOrder: 'asc' } });
  }

  async findOne(id: string) {
    const pooja = await this.prisma.pooja.findUnique({ where: { id } });
    if (!pooja) throw new NotFoundException('Pooja not found');
    return pooja;
  }

  create(dto: CreatePoojaDto) {
    return this.prisma.pooja.create({ data: dto });
  }

  async update(id: string, dto: UpdatePoojaDto) {
    await this.findOne(id);
    return this.prisma.pooja.update({ where: { id }, data: dto });
  }

  async remove(id: string) {
    await this.findOne(id);
    // soft delete to preserve booking history integrity
    return this.prisma.pooja.update({ where: { id }, data: { isActive: false } });
  }
}
