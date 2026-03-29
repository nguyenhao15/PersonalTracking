import { Injectable } from '@nestjs/common';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Expense } from './entities/expense.entity';
import { Repository } from 'typeorm';
import { WalletService } from '../wallet/wallet.service';
import { CategoriesService } from '../categories/categories.service';

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
    return `This action returns all expenses`;
  }

  findOne(id: number) {
    return `This action returns a #${id} expense`;
  }

  update(id: number, updateExpenseDto: UpdateExpenseDto) {
    return `This action updates a #${id} expense`;
  }

  remove(id: number) {
    return `This action removes a #${id} expense`;
  }
}
