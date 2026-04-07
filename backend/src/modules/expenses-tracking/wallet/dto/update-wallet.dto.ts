import { PartialType } from '@nestjs/swagger';
import { CreateWalletDto } from './create-wallet.dto';
import { IsBoolean, IsString } from 'class-validator';

export class UpdateWalletDto extends PartialType(CreateWalletDto) {}
