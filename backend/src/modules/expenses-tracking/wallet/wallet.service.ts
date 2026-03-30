import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { UpdateWalletDto } from './dto/update-wallet.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Wallet } from './entities/wallet.entity';
import { Repository } from 'typeorm';
import { QueryUtils } from 'src/common/utils/query.utils';

@Injectable()
export class WalletService {
  constructor(
    @InjectRepository(Wallet)
    private readonly walletRepository: Repository<Wallet>,
  ) {}

  create(createWalletDto: CreateWalletDto) {
    const wallet = this.walletRepository.create(createWalletDto);
    return this.walletRepository.save(wallet);
  }

  findAll() {
    const options = QueryUtils.applyOwnership<Wallet>();
    return this.walletRepository.find(options);
  }

  async findOne(id: number) {
    const wallet = await this.walletRepository.findOneBy({ id });
    if (!wallet) {
      throw new NotFoundException(`Wallet with id ${id} not found`);
    }
    return wallet;
  }

  async update(id: number, updateWalletDto: UpdateWalletDto) {
    const wallet = await this.findOne(id);
    const updatedWallet = this.walletRepository.merge(wallet, updateWalletDto);
    return this.walletRepository.save(updatedWallet);
  }

  async remove(id: number) {
    const wallet = await this.findOne(id);
    return this.walletRepository.remove(wallet);
  }

  async updateBalance(wallet: Wallet, amount: number) {
    wallet.balance += amount;
    return this.walletRepository.save(wallet);
  }
}
