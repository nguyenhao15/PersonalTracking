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
    this.walletService.updateBalance(fromWallet, -createTransferDto.amount);
    this.walletService.updateBalance(toWallet, createTransferDto.amount);
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
    const amountDifference = updateTransferDto.amount - transfer.amount;
    if (amountDifference !== 0) {
      const fromWallet = await this.walletService.findOne(
        transfer.fromWalletId,
      );
      const toWallet = await this.walletService.findOne(transfer.toWalletId);
      this.walletService.updateBalance(fromWallet, -amountDifference);
      this.walletService.updateBalance(toWallet, amountDifference);
    }
    return this.transferRepository.save({ ...transfer, ...updateTransferDto });
  }

  async remove(id: number) {
    const transfer = this.findOne(id);
    const amount = transfer.amount;
    if (amount) {
      this.walletService.updateBalance(
        await this.walletService.findOne(transfer.fromWalletId),
        amount,
      );
      this.walletService.updateBalance(
        await this.walletService.findOne(transfer.toWalletId),
        -amount,
      );
    }
    return this.transferRepository.delete(id);
  }
}
