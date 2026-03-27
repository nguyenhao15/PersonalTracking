import { Test, TestingModule } from '@nestjs/testing';
import { DebtTrasactionsService } from './debt-trasactions.service';

describe('DebtTrasactionsService', () => {
  let service: DebtTrasactionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DebtTrasactionsService],
    }).compile();

    service = module.get<DebtTrasactionsService>(DebtTrasactionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
