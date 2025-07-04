import { Test, TestingModule } from '@nestjs/testing';
import { UdemyProvider } from './udemy.provider';

describe('UdemyProvider', () => {
  let provider: UdemyProvider;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UdemyProvider],
    }).compile();

    provider = module.get<UdemyProvider>(UdemyProvider);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
