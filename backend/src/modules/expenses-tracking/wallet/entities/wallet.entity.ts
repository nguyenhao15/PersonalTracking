import { BaseAuditEntity } from 'src/core/security/common/entities/base.entity';
import { Column, Entity, OneToMany, Unique } from 'typeorm';
import { Transaction } from '../../transactions/entities/transaction.entity';

@Entity()
export class Wallet extends BaseAuditEntity {
  @Column()
  @Unique(['walletName'])
  walletName: string;

  @Column()
  balance: number;

  @Column()
  walletType: string;

  @Column()
  description: string;

  @Column({ default: 'VND' })
  currency: string;

  @Column({ default: true })
  isActive: boolean;

  @OneToMany(() => Transaction, (transaction) => transaction.wallet)
  transactions: Transaction[];
}
