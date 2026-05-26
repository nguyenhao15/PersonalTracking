import { BaseAuditEntity } from 'src/core/security/common/entities/base.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Wallet } from '../../wallet/entities/wallet.entity';

@Entity()
export class Debt extends BaseAuditEntity {
  @Column()
  description: string;

  @Column()
  transactionDate: Date;

  @Column()
  amount: number;

  @ManyToOne(() => Wallet, (wallet) => wallet.transactions, {
    onDelete: 'RESTRICT', // Đảm bảo không mất dữ liệu thu chi khi xóa ví
  })
  @JoinColumn({ name: 'walletId' })
  wallet: Wallet;

  @Column({
    enum: ['borrow', 'lend'],
    type: 'enum',
  })
  type: 'borrow' | 'lend';

  @Column({
    enum: ['pending', 'paid', 'cancelled'],
    type: 'enum',
    default: 'pending',
  })
  status: 'pending' | 'paid' | 'cancelled';
}
