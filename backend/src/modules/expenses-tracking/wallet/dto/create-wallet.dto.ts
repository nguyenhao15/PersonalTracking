import { IsBoolean, IsNumber, IsString } from 'class-validator';

export class CreateWalletDto {
  @IsString()
  walletName: string;

  @IsNumber()
  balance: number;

  @IsString()
  walletType: string;

  @IsString()
  description: string;

  @IsBoolean()
  isActive: boolean;
}
