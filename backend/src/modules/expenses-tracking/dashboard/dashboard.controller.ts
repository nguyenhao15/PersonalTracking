import { Controller, Get, Query } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { DashboardQueryDto } from './dto/handle-transaction.dto';

@Controller('dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get('statistics')
  async getStatistics(@Query() query: DashboardQueryDto) {
    return this.dashboardService.getStatistics(query);
  }
}
