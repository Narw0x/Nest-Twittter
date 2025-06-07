import { Test, TestingModule } from '@nestjs/testing';
import { TwitsController } from './twits.controller';

describe('TwitsController', () => {
  let controller: TwitsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TwitsController],
    }).compile();

    controller = module.get<TwitsController>(TwitsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
