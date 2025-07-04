import { Module } from '@nestjs/common';
import { ScraperService } from './scraper.service';
import { UdemyProvider } from './udemy.provider';

@Module({
  providers: [ScraperService, UdemyProvider],
  exports: [UdemyProvider],
})
export class ScraperModule {}

