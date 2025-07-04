import { Module } from '@nestjs/common';
import { CourseController } from './course.controller';
import { CourseService } from './course.service';
import { ApiModule } from 'src/source/api/api.module';
import { ScraperModule } from 'src/source/scraper/scraper.module';

@Module({
  controllers: [CourseController],
  imports: [ApiModule, ScraperModule],
  providers: [CourseService]
})
export class CourseModule {}
