import { Type } from 'class-transformer';
import { IsBoolean, IsDate, IsInt, IsString } from 'class-validator';
import { CategoryType } from '../../categories/dto/category-type.enum';
import { TagEnum } from '../../utils/app.const';

export class CreateTransactionDto {
  @IsInt({
    message: 'Base amount must be a positive integer',
  })
  baseAmount: number;

  @IsString({
    message: 'Base currency must be a string',
  })
  baseCurrency: string;

  @IsInt({
    message: 'Original amount must be a positive integer',
  })
  originalAmount: number;

  @IsString({
    message: 'Original currency must be a string',
  })
  originalCurrency: string;

  @IsInt({
    message: 'Exchange rate must be a positive integer',
  })
  exchangeRate: number;

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
  tag: TagEnum;

  @IsString({
    message: 'Transaction type must be a string',
  })
  transactionType: CategoryType;

  @IsBoolean()
  excludedFromReports: boolean;
}
