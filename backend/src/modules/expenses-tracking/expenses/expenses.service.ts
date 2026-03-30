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
    const options = QueryUtils.applyOwnership<Expense>();
    return this.expenseRepository.find(options);
  }

  findOne(id: number) {
    const options = QueryUtils.applyOwnership<Expense>({ where: { id } });
    return this.expenseRepository.findOne(options);
  }

  update(id: number, updateExpenseDto: UpdateExpenseDto) {
    const expense = this.expenseRepository.findOne({ where: { id } });

    return this.expenseRepository.save({ ...expense, ...updateExpenseDto });
  }

  remove(id: number) {
    return `This action removes a #${id} expense`;
  }
}
