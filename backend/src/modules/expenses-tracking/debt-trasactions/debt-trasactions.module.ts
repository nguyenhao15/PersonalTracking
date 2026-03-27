import { Module } from '@nestjs/common';
import { DebtTrasactionsService } from './debt-trasactions.service';
import { DebtTrasactionsController } from './debt-trasactions.controller';

@Module({
  controllers: [DebtTrasactionsController],
  providers: [DebtTrasactionsService],
})
export class DebtTrasactionsModule {}
