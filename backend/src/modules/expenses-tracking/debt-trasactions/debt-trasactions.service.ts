import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DebtTransaction } from './entities/debt-trasaction.entity';
import { Debt } from '../debt/entities/debt.entity';
import { Wallet } from '../wallet/entities/wallet.entity';
import { WalletService } from '../wallet/wallet.service';
import { CreateDebtTrasactionDto } from './dto/create-debt-trasaction.dto';
import { UpdateDebtTrasactionDto } from './dto/update-debt-trasaction.dto';
import { QueryUtils } from 'src/common/utils/query.utils';

@Injectable()
export class DebtTrasactionsService {
  constructor(
    @InjectRepository(DebtTransaction)
    private readonly debtTransactionRepository: Repository<DebtTransaction>,
    @InjectRepository(Debt)
    private readonly debtRepository: Repository<Debt>,
    private readonly walletService: WalletService,
  ) {}

  findAll() {
    const options = QueryUtils.applyOwnership<DebtTransaction>({
      relations: ['debt', 'wallet'],
    });
    return this.debtTransactionRepository.find(options);
  }

  async findOne(id: number) {
    const options = QueryUtils.applyOwnership<DebtTransaction>({
      where: { id },
      relations: ['debt', 'wallet'],
    });
    const transaction = await this.debtTransactionRepository.findOne(options);
    if (!transaction) {
      throw new NotFoundException(`Debt transaction with id ${id} not found`);
    }
    return transaction;
  }

  async create(createDebtTrasactionDto: CreateDebtTrasactionDto) {
    // 1. Kiểm tra Debt tồn tại và thuộc sở hữu của user
    const debtOptions = QueryUtils.applyOwnership<Debt>({
      where: { id: createDebtTrasactionDto.debtId },
    });
    const debt = await this.debtRepository.findOne(debtOptions);
    if (!debt) {
      throw new NotFoundException(`Debt with id ${createDebtTrasactionDto.debtId} not found`);
    }

    // 2. Kiểm tra Wallet tồn tại
    const wallet = await this.walletService.findOne(createDebtTrasactionDto.walletId);
    if (!wallet) {
      throw new NotFoundException(`Wallet with id ${createDebtTrasactionDto.walletId} not found`);
    }

    // 3. Cập nhật số dư ví (Quy tắc ngược lại với hạch toán của Debt)
    // - Với Debt: 'borrow' -> Wallet (+), 'lend' -> Wallet (-)
    // - Với DebtTransaction: Trả nợ borrow -> Wallet (-), Được trả nợ lend -> Wallet (+)
    if (debt.type === 'borrow') {
      await this.walletService.updateBalance(wallet, -createDebtTrasactionDto.amount);
    } else if (debt.type === 'lend') {
      await this.walletService.updateBalance(wallet, createDebtTrasactionDto.amount);
    }

    // 4. Tạo và lưu transaction
    const transactionDate = createDebtTrasactionDto.transactionDate
      ? new Date(createDebtTrasactionDto.transactionDate)
      : new Date();

    const transaction = this.debtTransactionRepository.create({
      description: createDebtTrasactionDto.description,
      amount: createDebtTrasactionDto.amount,
      transactionDate,
      debtId: debt.id,
      walletId: wallet.id,
      debt,
      wallet,
    });

    const savedTransaction = await this.debtTransactionRepository.save(transaction);

    // 5. Cập nhật trạng thái của Debt
    await this.recalculateDebtStatus(debt.id);

    return savedTransaction;
  }

  async update(id: number, updateDebtTrasactionDto: UpdateDebtTrasactionDto) {
    // 1. Tìm transaction cũ
    const oldTransaction = await this.findOne(id);

    // 2. Kiểm tra Debt mới (nếu thay đổi)
    const debtId = updateDebtTrasactionDto.debtId !== undefined ? updateDebtTrasactionDto.debtId : oldTransaction.debtId;
    const debtOptions = QueryUtils.applyOwnership<Debt>({ where: { id: debtId } });
    const debt = await this.debtRepository.findOne(debtOptions);
    if (!debt) {
      throw new NotFoundException(`Debt with id ${debtId} not found`);
    }

    // 3. Kiểm tra Wallet mới (nếu thay đổi)
    const walletId = updateDebtTrasactionDto.walletId !== undefined ? updateDebtTrasactionDto.walletId : oldTransaction.walletId;
    const wallet = await this.walletService.findOne(walletId);
    if (!wallet) {
      throw new NotFoundException(`Wallet with id ${walletId} not found`);
    }

    // 4. Hoàn tác số dư trên ví cũ
    const oldWallet = oldTransaction.wallet;
    if (oldTransaction.debt.type === 'borrow') {
      await this.walletService.updateBalance(oldWallet, oldTransaction.amount);
    } else if (oldTransaction.debt.type === 'lend') {
      await this.walletService.updateBalance(oldWallet, -oldTransaction.amount);
    }

    // 5. Cập nhật số dư trên ví mới với amount mới
    const newAmount = updateDebtTrasactionDto.amount !== undefined ? updateDebtTrasactionDto.amount : oldTransaction.amount;
    if (debt.type === 'borrow') {
      await this.walletService.updateBalance(wallet, -newAmount);
    } else if (debt.type === 'lend') {
      await this.walletService.updateBalance(wallet, newAmount);
    }

    // 6. Merge và save
    const merged = this.debtTransactionRepository.merge(oldTransaction, {
      ...updateDebtTrasactionDto,
      transactionDate: updateDebtTrasactionDto.transactionDate ? new Date(updateDebtTrasactionDto.transactionDate) : oldTransaction.transactionDate,
      debt,
      wallet,
      debtId: debt.id,
      walletId: wallet.id,
    });

    const saved = await this.debtTransactionRepository.save(merged);

    // 7. Cập nhật trạng thái của cả Debt cũ và Debt mới (nếu thay đổi)
    await this.recalculateDebtStatus(oldTransaction.debtId);
    if (oldTransaction.debtId !== debt.id) {
      await this.recalculateDebtStatus(debt.id);
    }

    return saved;
  }

  async remove(id: number) {
    // 1. Tìm transaction
    const transaction = await this.findOne(id);

    // 2. Hoàn tác số dư trên ví
    const wallet = transaction.wallet;
    if (transaction.debt.type === 'borrow') {
      await this.walletService.updateBalance(wallet, transaction.amount);
    } else if (transaction.debt.type === 'lend') {
      await this.walletService.updateBalance(wallet, -transaction.amount);
    }

    // 3. Xóa transaction
    const removed = await this.debtTransactionRepository.remove(transaction);

    // 4. Cập nhật trạng thái Debt
    await this.recalculateDebtStatus(transaction.debtId);

    return removed;
  }

  private async recalculateDebtStatus(debtId: number) {
    const debt = await this.debtRepository.findOne({
      where: { id: debtId },
      relations: ['transactions'],
    });
    if (!debt) return;

    const totalPaid = (debt.transactions || []).reduce((sum, tx) => sum + tx.amount, 0);
    if (totalPaid >= debt.amount) {
      debt.status = 'paid';
    } else {
      debt.status = 'pending';
    }
    await this.debtRepository.save(debt);
  }
}
