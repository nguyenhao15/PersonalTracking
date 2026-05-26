import { IsInt, IsString } from 'class-validator';

export class CreateDebtDto {
  @IsString({
    message: 'Description must be a string',
  })
  description: string;

  @IsInt({
    message: 'Amount must be a positive integer',
  })
  amount: number;

  @IsInt()
  walletId: number;

  @IsString({
    message: 'Type must be a string',
  })
  type: 'borrow' | 'lend';

  @IsString({
    message: 'Status must be a string',
  })
  status: 'pending' | 'paid' | 'cancelled';
}
