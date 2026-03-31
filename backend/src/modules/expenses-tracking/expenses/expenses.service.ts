import { Injectable } from '@nestjs/common';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Expense } from './entities/expense.entity';
import { Repository } from 'typeorm';
import { WalletService } from '../wallet/wallet.service';
import { CategoriesService } from '../categories/categories.service';
import { QueryUtils } from 'src/common/utils/query.utils';

@Injectable()
export class ExpensesService {
  constructor(
    @InjectRepository(Expense)
    private readonly expenseRepository: Repository<Expense>,
    private readonly walletService: WalletService,
    private readonly categoryService: CategoriesService,
  ) {}

  async create(createExpenseDto: CreateExpenseDto) {
    const wallet = await this.walletService.findOne(createExpenseDto.walletId);
    const category = await this.categoryService.findOne(
      createExpenseDto.categoryId,
    );
    const expense = this.expenseRepository.create(createExpenseDto);
    await this.walletService.updateBalance(wallet, -createExpenseDto.amount);
    return this.expenseRepository.save(expense);
  }

  findAll() {
    return this.expenseRepository.find();
  }

  findAllByUser() {
    const options = QueryUtils.applyOwnership<Expense>();
    return this.expenseRepository.find(options);
  }

  findOne(id: number) {
    const options = QueryUtils.applyOwnership<Expense>({ where: { id } });
    return this.expenseRepository.findOne(options);
  }

  async update(id: number, updateExpenseDto: UpdateExpenseDto) {
    const expense = await this.expenseRepository.findOne({ where: { id } });
    if (!expense) {
      return null;
    }
    const newAmount = updateExpenseDto.amount ?? 0;
    const oldWalletId = expense.walletId ?? expense.walletId;
    const newWalletId = updateExpenseDto.walletId ?? expense.walletId;

    const oldWallet = await this.walletService.findOne(oldWalletId);
    const newWallet = await this.walletService.findOne(newWalletId);

    const amountDifference = newAmount - expense.amount;
    if (amountDifference !== 0) {
      await this.walletService.updateBalance(newWallet, -amountDifference);
      await this.walletService.updateBalance(oldWallet, amountDifference);
    }
    return this.expenseRepository.save({ ...expense, ...updateExpenseDto });
  }

  async remove(id: number) {
    const expense = await this.findOne(id);
    if (!expense) {
      return null;
    }
    const amount = expense.amount ?? 0;
    const wallet = await this.walletService.findOne(expense.walletId);
    if (amount) {
      await this.walletService.updateBalance(wallet, amount);
    }
    return this.expenseRepository.delete(id);
  }
}
