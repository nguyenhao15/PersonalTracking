import { Module } from '@nestjs/common';
import { DebtTrasactionsService } from './debt-trasactions.service';
import { DebtTrasactionsController } from './debt-trasactions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DebtTransaction } from './entities/debt-trasaction.entity';
import { Debt } from '../debt/entities/debt.entity';
import { WalletModule } from '../wallet/wallet.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([DebtTransaction, Debt]),
    WalletModule,
  ],
  controllers: [DebtTrasactionsController],
  providers: [DebtTrasactionsService],
  exports: [DebtTrasactionsService],
})
export class DebtTrasactionsModule {}
