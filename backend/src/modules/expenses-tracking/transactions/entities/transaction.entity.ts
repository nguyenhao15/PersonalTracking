import { BaseAuditEntity } from 'src/core/security/common/entities/base.entity';
import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { Wallet } from '../../wallet/entities/wallet.entity';
import { Category } from '../../categories/entities/category.entity';
import { CategoryType } from '../../categories/dto/category-type.enum';
import { TagEnum } from '../../utils/app.const';

@Entity()
export class Transaction extends BaseAuditEntity {
  @Column()
  amount: number;

  @Column()
  description: string;

  @Column()
  @Index()
  date: Date;

  @ManyToOne(() => Category, (category) => category.transactions, {
    onDelete: 'RESTRICT', // Đảm bảo không mất dữ liệu thu chi khi xóa danh mục
  })
  @JoinColumn({ name: 'categoryId' })
  @Index()
  category: Category;

  @Column()
  walletId: number;

  @Column()
  categoryId: number;

  @ManyToOne(() => Wallet, (wallet) => wallet.transactions, {
    onDelete: 'RESTRICT', // Đảm bảo không mất dữ liệu thu chi khi xóa ví
  })
  @JoinColumn({ name: 'walletId' })
  wallet: Wallet;

  @Column({
    enum: TagEnum,
    type: 'enum',
    default: TagEnum.NC,
  })
  tag: string;

  @Column({
    enum: CategoryType,
    type: 'enum',
    default: CategoryType.EXPENSE,
  })
  transactionType: CategoryType;

  @Column({ default: false })
  excludedFromReports: boolean;
}
