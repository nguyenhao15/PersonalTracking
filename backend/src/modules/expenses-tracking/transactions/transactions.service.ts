import { Injectable } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Transaction } from './entities/transaction.entity';
import { Repository } from 'typeorm';
import { WalletService } from '../wallet/wallet.service';
import { CategoriesService } from '../categories/categories.service';
import { QueryUtils } from 'src/common/utils/query.utils';
import { CategoryType } from '../categories/dto/category-type.enum';
import { log } from 'console';

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

    const updateAmount =
      createTransactionDto.transactionType === CategoryType.EXPENSE
        ? -createTransactionDto.amount
        : createTransactionDto.amount;

    await this.walletService.updateBalance(wallet, updateAmount);
    return this.transactionRepository.save(transaction);
  }

  findAll() {
    return this.transactionRepository.find();
  }

  async findAllByUser() {
    const options = QueryUtils.applyOwnership<Transaction>();

    const minimalTransactions = await this.transactionRepository
      .createQueryBuilder('transaction')
      .leftJoin('transaction.wallet', 'wallet')
      .leftJoin('transaction.category', 'category')
      .select([
        'transaction.id',
        'transaction.amount',
        'transaction.description',
        'transaction.date',
        'transaction.tag',
        'transaction.transactionType',
        'wallet.walletName',
        'wallet.id',
        'category.name',
        'category.id',
      ])
      .setFindOptions({ where: options.where })
      .getMany();
    return minimalTransactions;
  }

  findOne(id: number) {
    const options = QueryUtils.applyOwnership<Transaction>({
      where: { id },
      relations: ['wallet', 'category'],
    });
    return this.transactionRepository.findOne(options);
  }

  async update(id: number, updateTransactionDto: UpdateTransactionDto) {
    const transaction = await this.transactionRepository.findOne({
      where: { id },
    });
    if (!transaction) {
      return null;
    }

    const oldTransactionType = transaction.transactionType;
    const newTransactionType =
      updateTransactionDto.transactionType ?? transaction.transactionType;

    const oldAmount = transaction.amount;
    const newAmount = updateTransactionDto.amount ?? transaction.amount;

    const wallet = await this.walletService.findOne(
      transaction.wallet?.id ?? transaction.wallet.id,
    );

    if (oldTransactionType === CategoryType.EXPENSE) {
      await this.walletService.updateBalance(wallet, oldAmount);
    } else {
      await this.walletService.updateBalance(wallet, -oldAmount);
    }

    if (newTransactionType === CategoryType.EXPENSE) {
      await this.walletService.updateBalance(wallet, -newAmount);
    } else {
      await this.walletService.updateBalance(wallet, newAmount);
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
      if (transaction.transactionType === CategoryType.EXPENSE) {
        await this.walletService.updateBalance(wallet, amount);
      } else {
        await this.walletService.updateBalance(wallet, -amount);
      }
    }
    return this.transactionRepository.delete(id);
  }
}
