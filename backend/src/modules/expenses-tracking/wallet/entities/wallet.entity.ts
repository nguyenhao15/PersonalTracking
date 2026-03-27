import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Wallet {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  walletName: string;

  @Column()
  balance: number;

  @Column()
  walletType: string;

  @Column()
  description: string;
}
