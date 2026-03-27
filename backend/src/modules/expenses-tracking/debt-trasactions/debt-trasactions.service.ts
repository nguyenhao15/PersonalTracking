import { Injectable } from '@nestjs/common';
import { CreateDebtTrasactionDto } from './dto/create-debt-trasaction.dto';
import { UpdateDebtTrasactionDto } from './dto/update-debt-trasaction.dto';

@Injectable()
export class DebtTrasactionsService {
  create(createDebtTrasactionDto: CreateDebtTrasactionDto) {
    return 'This action adds a new debtTrasaction';
  }

  findAll() {
    return `This action returns all debtTrasactions`;
  }

  findOne(id: number) {
    return `This action returns a #${id} debtTrasaction`;
  }

  update(id: number, updateDebtTrasactionDto: UpdateDebtTrasactionDto) {
    return `This action updates a #${id} debtTrasaction`;
  }

  remove(id: number) {
    return `This action removes a #${id} debtTrasaction`;
  }
}
