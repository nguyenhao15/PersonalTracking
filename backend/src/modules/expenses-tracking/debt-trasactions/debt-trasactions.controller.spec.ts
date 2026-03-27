import { Test, TestingModule } from '@nestjs/testing';
import { DebtTrasactionsController } from './debt-trasactions.controller';
import { DebtTrasactionsService } from './debt-trasactions.service';

describe('DebtTrasactionsController', () => {
  let controller: DebtTrasactionsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DebtTrasactionsController],
      providers: [DebtTrasactionsService],
    }).compile();

    controller = module.get<DebtTrasactionsController>(DebtTrasactionsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
