import { BaseAuditEntity } from 'src/core/security/common/entities/base.entity';
import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';

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

  @Column({ default: true })
  isActive: boolean;
}
