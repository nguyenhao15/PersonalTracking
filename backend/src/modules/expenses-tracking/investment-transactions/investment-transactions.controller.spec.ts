import { Test, TestingModule } from '@nestjs/testing';
import { InvestmentTransactionsController } from './investment-transactions.controller';
import { InvestmentTransactionsService } from './investment-transactions.service';

describe('InvestmentTransactionsController', () => {
  let controller: InvestmentTransactionsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InvestmentTransactionsController],
      providers: [InvestmentTransactionsService],
    }).compile();

    controller = module.get<InvestmentTransactionsController>(InvestmentTransactionsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
