import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Income {
  @PrimaryGeneratedColumn()
  id: number;

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
