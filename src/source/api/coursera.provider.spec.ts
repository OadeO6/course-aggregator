import { Test, TestingModule } from '@nestjs/testing';
import { CourseraProvider } from './coursera.provider';

describe('CourseraProvider', () => {
  let provider: CourseraProvider;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CourseraProvider],
    }).compile();

    provider = module.get<CourseraProvider>(CourseraProvider);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
