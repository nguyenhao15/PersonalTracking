import { Module } from '@nestjs/common';
import { ExpensesService } from './expenses.service';
import { ExpensesController } from './expenses.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Expense } from './entities/expense.entity';
import { WalletModule } from '../wallet/wallet.module';
import { CategoriesModule } from '../categories/categories.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Expense]),
    WalletModule,
    CategoriesModule,
  ], // Thêm các Entity vào đây nếu có
  controllers: [ExpensesController],
  providers: [ExpensesService],
})
export class ExpensesModule {}
