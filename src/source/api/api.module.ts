import { Module } from '@nestjs/common';
import { ApiService } from './api.service';
import { CourseraProvider } from './coursera.provider';

@Module({
  providers: [ApiService, CourseraProvider],
  exports: [CourseraProvider],
})
export class ApiModule {}
