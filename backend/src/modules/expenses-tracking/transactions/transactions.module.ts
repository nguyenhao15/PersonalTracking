import { Module } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { TransactionsController } from './transactions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transaction } from './entities/transaction.entity';
import { WalletModule } from '../wallet/wallet.module';
import { CategoriesModule } from '../categories/categories.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Transaction]),
    WalletModule,
    CategoriesModule,
  ], // Thêm các Entity vào đây nếu có
  controllers: [TransactionsController],
  providers: [TransactionsService],
})
export class TransactionsModule {}
