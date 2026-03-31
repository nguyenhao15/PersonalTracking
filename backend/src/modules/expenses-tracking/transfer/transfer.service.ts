import { Injectable } from '@nestjs/common';
import { CreateTransferDto } from './dto/create-transfer.dto';
import { UpdateTransferDto } from './dto/update-transfer.dto';
import { Repository } from 'typeorm';
import { Transfer } from './entities/transfer.entity';
import { WalletService } from '../wallet/wallet.service';
import { CategoriesService } from '../categories/categories.service';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryUtils } from 'src/common/utils/query.utils';

@Injectable()
export class TransferService {
  constructor(
    @InjectRepository(Transfer)
    private readonly transferRepository: Repository<Transfer>,
    private readonly walletService: WalletService,
    private readonly categoryService: CategoriesService,
  ) {}

  async create(createTransferDto: CreateTransferDto) {
    const transfer = this.transferRepository.create(createTransferDto);
    const fromWallet = await this.walletService.findOne(
      createTransferDto.fromWalletId,
    );
    const toWallet = await this.walletService.findOne(
      createTransferDto.toWalletId,
    );
    await this.walletService.updateBalance(
      fromWallet,
      -createTransferDto.amount,
    );
    await this.walletService.updateBalance(toWallet, createTransferDto.amount);
    return this.transferRepository.save(transfer);
  }

  findAll() {
    return this.transferRepository.find();
  }

  findAllByUser() {
    const options = QueryUtils.applyOwnership<Transfer>();
    return this.transferRepository.find(options);
  }

  findOne(id: number) {
    const options = QueryUtils.applyOwnership<Transfer>({ where: { id } });
    return this.transferRepository.findOne(options);
  }

  async update(id: number, updateTransferDto: UpdateTransferDto) {
    const transfer = await this.transferRepository.findOne({ where: { id } });
    if (!transfer) {
      return null;
    }
    const newAmount = updateTransferDto.amount ?? 0;
    const amountDifference = newAmount - transfer.amount;
    if (amountDifference !== 0) {
      const fromWallet = await this.walletService.findOne(
        transfer.fromWalletId,
      );
      const toWallet = await this.walletService.findOne(transfer.toWalletId);
      await this.walletService.updateBalance(fromWallet, -amountDifference);
      await this.walletService.updateBalance(toWallet, amountDifference);
    }
    return this.transferRepository.save({ ...transfer, ...updateTransferDto });
  }

  async remove(id: number) {
    const transfer = await this.findOne(id);
    if (!transfer) {
      return null;
    }
    const amount = transfer.amount ?? 0;
    if (amount) {
      const fromWallet = await this.walletService.findOne(
        transfer.fromWalletId,
      );
      const toWallet = await this.walletService.findOne(transfer.toWalletId);
      await this.walletService.updateBalance(fromWallet, amount);
      await this.walletService.updateBalance(toWallet, -amount);
    }
    return this.transferRepository.delete(id);
  }
}
