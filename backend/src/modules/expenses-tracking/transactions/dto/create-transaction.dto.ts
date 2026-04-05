import { Type } from 'class-transformer';
import { IsBoolean, IsDate, IsInt, IsString } from 'class-validator';
import { CategoryType } from '../../categories/dto/category-type.enum';

export class CreateTransactionDto {
  @IsInt({
    message: 'Amount must be a positive integer',
  })
  amount: number;

  @IsString({
    message: 'Description must be a string',
  })
  description: string;

  @Type(() => Date)
  @IsDate()
  date: Date;

  @IsInt()
  categoryId: number;

  @IsInt()
  walletId: number;

  @IsString({
    message: 'Tag must be a string',
  })
  tag: string;

  @IsString({
    message: 'Transaction type must be a string',
  })
  transactionType: CategoryType;

  @IsBoolean()
  excludedFromReports: boolean;
}
