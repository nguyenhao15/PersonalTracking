import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DebtTrasactionsService } from './debt-trasactions.service';
import { CreateDebtTrasactionDto } from './dto/create-debt-trasaction.dto';
import { UpdateDebtTrasactionDto } from './dto/update-debt-trasaction.dto';

@Controller('debt-trasactions')
export class DebtTrasactionsController {
  constructor(private readonly debtTrasactionsService: DebtTrasactionsService) {}

  @Post()
  create(@Body() createDebtTrasactionDto: CreateDebtTrasactionDto) {
    return this.debtTrasactionsService.create(createDebtTrasactionDto);
  }

  @Get()
  findAll() {
    return this.debtTrasactionsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.debtTrasactionsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDebtTrasactionDto: UpdateDebtTrasactionDto) {
    return this.debtTrasactionsService.update(+id, updateDebtTrasactionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.debtTrasactionsService.remove(+id);
  }
}
