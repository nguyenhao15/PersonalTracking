import { Module } from '@nestjs/common';
import { TransferService } from './transfer.service';
import { TransferController } from './transfer.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transfer } from './entities/transfer.entity';
import { CategoriesModule } from '../categories/categories.module';
import { WalletModule } from '../wallet/wallet.module';

@Module({
  controllers: [TransferController],
  providers: [TransferService],
  imports: [
    TypeOrmModule.forFeature([Transfer]),
    WalletModule,
    CategoriesModule,
  ],
})
export class TransferModule {}
