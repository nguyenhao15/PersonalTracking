import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity()
export class Wallet {
  @PrimaryGeneratedColumn()
  id: number;

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
