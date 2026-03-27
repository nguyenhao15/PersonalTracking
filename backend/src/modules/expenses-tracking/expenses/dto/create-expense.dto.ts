import { IsDate, IsInt, IsString } from 'class-validator';

export class CreateExpenseDto {
  @IsInt()
  amount: number;
  description: string;

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
