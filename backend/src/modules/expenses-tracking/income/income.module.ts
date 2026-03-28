import { Module } from '@nestjs/common';
import { IncomeService } from './income.service';
import { IncomeController } from './income.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Income } from './entities/income.entity';
import { CategoriesModule } from '../categories/categories.module';
import { WalletModule } from '../wallet/wallet.module';

@Module({
  imports: [TypeOrmModule.forFeature([Income]), CategoriesModule, WalletModule],
  controllers: [IncomeController],
  providers: [IncomeService],
})
export class IncomeModule {}
