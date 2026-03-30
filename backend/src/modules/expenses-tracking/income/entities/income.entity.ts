import { BaseAuditEntity } from 'src/core/security/common/entities/base.entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Income extends BaseAuditEntity {
  @Column()
  amount: number;

  @Column()
  description: string;

  @Column()
  date: Date;

  @Column()
  categoryId: number;

  @Column()
  walletId: number;
}
