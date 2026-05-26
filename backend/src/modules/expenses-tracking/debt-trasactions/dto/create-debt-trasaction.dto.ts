import { IsInt, IsOptional, IsString, IsDateString } from 'class-validator';

export class CreateDebtTrasactionDto {
  @IsString({
    message: 'Description must be a string',
  })
  description: string;

  @IsInt({
    message: 'Amount must be a positive integer',
  })
  amount: number;

  @IsOptional()
  @IsDateString({}, {
    message: 'Transaction date must be a valid ISO8601 date string',
  })
  transactionDate?: string;

  @IsInt()
  debtId: number;

  @IsInt()
  walletId: number;
}
