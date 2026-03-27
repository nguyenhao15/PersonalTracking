import { Module } from '@nestjs/common';
import { InvestmentTransactionsService } from './investment-transactions.service';
import { InvestmentTransactionsController } from './investment-transactions.controller';

@Module({
  controllers: [InvestmentTransactionsController],
  providers: [InvestmentTransactionsService],
})
export class InvestmentTransactionsModule {}
