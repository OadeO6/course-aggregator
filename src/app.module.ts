import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ScraperModule } from './source/scraper/scraper.module';
import { ApiModule } from './source/api/api.module';
import { CourseModule } from './course/course.module';

@Module({
  imports: [CourseModule, ApiModule, ScraperModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
