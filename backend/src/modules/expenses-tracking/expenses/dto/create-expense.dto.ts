import { Type } from 'class-transformer';
import { IsDate, IsInt, IsString } from 'class-validator';

export class CreateExpenseDto {
  @IsInt()
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
}
