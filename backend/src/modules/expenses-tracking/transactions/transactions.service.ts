import { Injectable } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Transaction } from './entities/transaction.entity';
import { Repository } from 'typeorm';
import { WalletService } from '../wallet/wallet.service';
import { CategoriesService } from '../categories/categories.service';
import { QueryUtils } from 'src/common/utils/query.utils';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(Transaction)
    private readonly transactionRepository: Repository<Transaction>,
    private readonly walletService: WalletService,
    private readonly categoryService: CategoriesService,
  ) {}

  async create(createTransactionDto: CreateTransactionDto) {
    const wallet = await this.walletService.findOne(
      createTransactionDto.walletId,
    );
    const category = await this.categoryService.findOne(
      createTransactionDto.categoryId,
    );
    const transaction = this.transactionRepository.create(createTransactionDto);
    await this.walletService.updateBalance(
      wallet,
      -createTransactionDto.amount,
    );
    return this.transactionRepository.save(transaction);
  }

  findAll() {
    return this.transactionRepository.find();
  }

  findAllByUser() {
    const options = QueryUtils.applyOwnership<Transaction>();
    return this.transactionRepository.find(options);
  }

  findOne(id: number) {
    const options = QueryUtils.applyOwnership<Transaction>({ where: { id } });
    return this.transactionRepository.findOne(options);
  }

  async update(id: number, updateTransactionDto: UpdateTransactionDto) {
    const transaction = await this.transactionRepository.findOne({
      where: { id },
    });
    if (!transaction) {
      return null;
    }
    const newAmount = updateTransactionDto.amount ?? 0;
    const oldWalletId = transaction.wallet?.id ?? transaction.wallet.id;
    const newWalletId = updateTransactionDto.walletId ?? transaction.wallet.id;

    const oldWallet = await this.walletService.findOne(oldWalletId);
    const newWallet = await this.walletService.findOne(newWalletId);

    const amountDifference = newAmount - transaction.amount;
    if (amountDifference !== 0) {
      await this.walletService.updateBalance(newWallet, -amountDifference);
      await this.walletService.updateBalance(oldWallet, amountDifference);
    }
    return this.transactionRepository.save({
      ...transaction,
      ...updateTransactionDto,
    });
  }

  async remove(id: number) {
    const transaction = await this.findOne(id);
    if (!transaction) {
      return null;
    }
    const amount = transaction.amount ?? 0;
    const wallet = await this.walletService.findOne(
      transaction.wallet?.id ?? transaction.wallet.id,
    );
    if (amount) {
      await this.walletService.updateBalance(wallet, amount);
    }
    return this.transactionRepository.delete(id);
  }
}
