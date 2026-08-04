import { Controller, Get, Query, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { ReportsService } from './reports.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('ADMIN', 'STAFF')
@Controller('reports')
export class ReportsController {
  constructor(private reportsService: ReportsService) {}

  @Get('summary')
  summary(@Query('from') from: string, @Query('to') to: string) {
    return this.reportsService.getSummary(from, to);
  }

  @Get('export/excel')
  async excel(@Query('from') from: string, @Query('to') to: string, @Res() res: Response) {
    const buffer = await this.reportsService.exportExcel(from, to);
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', `attachment; filename="report-${from}-to-${to}.xlsx"`);
    res.send(buffer);
  }

  @Get('export/pdf')
  async pdf(@Query('from') from: string, @Query('to') to: string, @Res() res: Response) {
    const buffer = await this.reportsService.exportPdf(from, to);
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="report-${from}-to-${to}.pdf"`);
    res.send(buffer);
  }
}
