import { Test, TestingModule } from '@nestjs/testing';
import { TwitsService } from './twits.service';

describe('TwitsService', () => {
  let service: TwitsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TwitsService],
    }).compile();

    service = module.get<TwitsService>(TwitsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
