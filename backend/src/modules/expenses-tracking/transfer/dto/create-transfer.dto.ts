import { Type } from 'class-transformer';
import { IsDate, IsInt, IsString } from 'class-validator';

export class CreateTransferDto {
  @IsInt()
  amount: number;

  @IsString()
  description: string;

  @IsDate()
  @Type(() => Date)
  date: Date;

  @IsInt()
  fromWalletId: number;

  @IsInt()
  toWalletId: number;

  @IsInt()
  fee: number;
}
