import { Type } from 'class-transformer';
import { IsDate, IsInt, IsString } from 'class-validator';

export class CreateIncomeDto {
  @IsInt()
  amount: number;

  @IsString({
    message: 'Description must be a string',
  })
  description: string;

  @IsInt({
    message: 'Category ID must be an integer',
  })
  categoryId: number;

  @IsInt({
    message: 'Wallet ID must be an integer',
  })
  walletId: number;

  @IsDate({
    message: 'Date must be a valid date',
  })
  @Type(() => Date)
  date: Date;
}
