import { BaseAuditEntity } from 'src/core/security/common/entities/base.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Debt } from '../../debt/entities/debt.entity';
import { Wallet } from '../../wallet/entities/wallet.entity';

@Entity()
export class DebtTransaction extends BaseAuditEntity {
  @Column()
  description: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  transactionDate: Date;

  @Column()
  amount: number;

  @Column()
  debtId: number;

  @Column()
  walletId: number;

  @ManyToOne(() => Debt, (debt) => debt.transactions, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'debtId' })
  debt: Debt;

  @ManyToOne(() => Wallet, {
    onDelete: 'RESTRICT',
  })
  @JoinColumn({ name: 'walletId' })
  wallet: Wallet;
}
