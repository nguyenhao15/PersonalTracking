import { PartialType } from '@nestjs/swagger';
import { CreateDebtTrasactionDto } from './create-debt-trasaction.dto';

export class UpdateDebtTrasactionDto extends PartialType(CreateDebtTrasactionDto) {}
