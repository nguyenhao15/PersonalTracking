import { Column, Entity, OneToMany } from 'typeorm';
import { CategoryType } from '../dto/category-type.enum';
import { BaseAuditEntity } from 'src/core/security/common/entities/base.entity';
import { Transaction } from '../../transactions/entities/transaction.entity';

@Entity()
export class Category extends BaseAuditEntity {
  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column({
    type: 'enum',
    enum: CategoryType,
    default: CategoryType.EXPENSE,
  })
  categoryType: CategoryType;

  @Column({ default: true })
  isActive: boolean;

  @OneToMany(() => Transaction, (transaction) => transaction.category)
  transactions: Transaction[];
}
