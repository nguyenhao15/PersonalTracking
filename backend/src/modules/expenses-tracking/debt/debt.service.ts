import { Injectable } from '@nestjs/common';
import { CreateDebtDto } from './dto/create-debt.dto';
import { UpdateDebtDto } from './dto/update-debt.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Debt } from './entities/debt.entity';
import { WalletService } from '../wallet/wallet.service';
import { QueryUtils } from 'src/common/utils/query.utils';

@Injectable()
export class DebtService {
  constructor(
    @InjectRepository(Debt)
    private readonly debtRepository: Repository<Debt>,
    private readonly walletService: WalletService,
  ) {}

  async create(createDebtDto: CreateDebtDto) {
    const wallet = await this.walletService.findOne(createDebtDto.walletId);
    const transactionDate = createDebtDto.transactionDate
      ? new Date(createDebtDto.transactionDate)
      : new Date();
    const debt = this.debtRepository.create({
      ...createDebtDto,
      transactionDate,
    });
    debt.wallet = wallet;
    if (createDebtDto.type === 'borrow') {
      await this.walletService.updateBalance(wallet, createDebtDto.amount);
    } else if (createDebtDto.type === 'lend') {
      await this.walletService.updateBalance(wallet, -createDebtDto.amount);
    }

    return this.debtRepository.save(debt);
  }

  findAll() {
    const options = QueryUtils.applyOwnership<Debt>({
      relations: ['wallet'],
    });
    return this.debtRepository.find(options);
  }

  async modifyWalletBalance(debt: Debt, amount: number) {
    const wallet = await this.walletService.findOne(debt.wallet.id);
    if (debt.type === 'borrow') {
      await this.walletService.updateBalance(wallet, -amount);
    } else if (debt.type === 'lend') {
      await this.walletService.updateBalance(wallet, amount);
    }
  }

  findOne(id: number) {
    const options = QueryUtils.applyOwnership<Debt>({
      where: { id },
      relations: ['wallet'],
    });
    return this.debtRepository.findOne(options);
  }

  async update(id: number, updateDebtDto: UpdateDebtDto) {
    const options = await this.findOne(id);
    if (!options) {
      throw new Error('Debt not found');
    }

    const debt = await this.debtRepository.preload({
      id,
      ...updateDebtDto,
    });

    if (!debt) {
      throw new Error('Debt not found');
    }

    if (updateDebtDto.amount && updateDebtDto.amount !== options.amount) {
      const amountDifference = updateDebtDto.amount - options.amount;
      await this.modifyWalletBalance(debt, amountDifference);
    }

    return this.debtRepository.save(debt);
  }

  async remove(id: number) {
    const debt = await this.findOne(id);
    if (!debt) {
      throw new Error('Debt not found');
    }
    await this.modifyWalletBalance(debt, debt.amount);

    return this.debtRepository.remove(debt);
  }

  async cancel(id: number) {
    const debt = await this.findOne(id);
    if (!debt) {
      throw new Error('Debt not found');
    }

    if (debt.status !== 'pending') {
      throw new Error('Only pending debts can be cancelled');
    }

    debt.status = 'cancelled';

    await this.modifyWalletBalance(debt, debt.amount);

    return this.debtRepository.save(debt);
  }

  async markAsPaid(id: number) {
    const debt = await this.findOne(id);
    if (!debt) {
      throw new Error('Debt not found');
    }

    if (debt.status !== 'pending') {
      throw new Error('Only pending debts can be marked as paid');
    }

    debt.status = 'paid';

    if (debt.type === 'borrow') {
      await this.walletService.updateBalance(debt.wallet, -debt.amount);
    } else if (debt.type === 'lend') {
      await this.walletService.updateBalance(debt.wallet, debt.amount);
    }
    return this.debtRepository.save(debt);
  }
}
