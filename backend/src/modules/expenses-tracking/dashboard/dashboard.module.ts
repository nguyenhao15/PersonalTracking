import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DashboardService } from './dashboard.service';
import { DashboardController } from './dashboard.controller';
import { Transaction } from '../transactions/entities/transaction.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Transaction])],
  providers: [DashboardService],
  controllers: [DashboardController],
})
export class DashboardModule {}
