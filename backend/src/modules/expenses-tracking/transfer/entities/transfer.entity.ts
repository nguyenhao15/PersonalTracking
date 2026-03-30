import { BaseAuditEntity } from 'src/core/security/common/entities/base.entity';
import { Column } from 'typeorm';

export class Transfer extends BaseAuditEntity {
  @Column()
  amount: number;

  @Column()
  description: string;

  @Column()
  date: Date;

  @Column()
  fromWalletId: number;

  @Column()
  toWalletId: number;

  @Column()
  fee: number;
}
