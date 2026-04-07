import { IsBoolean, IsEnum, IsNumber, IsString } from 'class-validator';
import { WalletTypeEnum } from '../../utils/app.const';

export class CreateWalletDto {
  @IsString()
  walletName: string;

  @IsNumber()
  balance: number;

  @IsEnum(WalletTypeEnum, {
    message: `walletType must be one of the following: ${Object.values(WalletTypeEnum).join(', ')}`,
  })
  walletType: WalletTypeEnum;

  @IsString()
  description: string;

  @IsBoolean()
  isActive: boolean;
}
