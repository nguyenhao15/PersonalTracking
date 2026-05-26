import { Module } from '@nestjs/common';
import { DebtService } from './debt.service';
import { DebtController } from './debt.controller';
import { Debt } from './entities/debt.entity';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';
import { WalletModule } from '../wallet/wallet.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Debt]), // Thêm các Entity vào đây nếu có
    WalletModule, // Thêm các module cần thiết vào đây nếu có
  ], // Thêm các module cần thiết vào đây nếu có
  controllers: [DebtController],
  providers: [TypeOrmModule, DebtService],
})
export class DebtModule {}
