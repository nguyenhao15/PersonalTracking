import { Injectable } from '@nestjs/common';
import { CreateIncomeDto } from './dto/create-income.dto';
import { UpdateIncomeDto } from './dto/update-income.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Income } from './entities/income.entity';
import { Repository } from 'typeorm';
import { WalletService } from '../wallet/wallet.service';
import { CategoriesService } from '../categories/categories.service';

@Injectable()
export class IncomeService {
  constructor(
    @InjectRepository(Income)
    private readonly incomeRepository: Repository<Income>,
    private readonly walletService: WalletService,
    private readonly categoryService: CategoriesService,
  ) {}

  async create(createIncomeDto: CreateIncomeDto) {
    const wallet = await this.walletService.findOne(createIncomeDto.walletId);
    const category = await this.categoryService.findOne(
      createIncomeDto.categoryId,
    );
    const income = this.incomeRepository.create(createIncomeDto);
    await this.walletService.updateBalance(wallet, createIncomeDto.amount);
    return this.incomeRepository.save(income);
  }

  findAll() {
    return `This action returns all income`;
  }

  findOne(id: number) {
    return `This action returns a #${id} income`;
  }

  update(id: number, updateIncomeDto: UpdateIncomeDto) {
    return `This action updates a #${id} income`;
  }

  remove(id: number) {
    return `This action removes a #${id} income`;
  }
}
