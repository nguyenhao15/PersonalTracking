import { PartialType } from '@nestjs/swagger';
import { CreateWalletDto } from './create-wallet.dto';
import { IsBoolean, IsString } from 'class-validator';

export class UpdateWalletDto extends PartialType(CreateWalletDto) {
  @IsString()
  walletName: string;

  @IsString()
  walletType: string;

  @IsString()
  description: string;

  @IsBoolean()
  isActive: boolean;
}
