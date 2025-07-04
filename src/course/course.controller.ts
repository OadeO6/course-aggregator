import { CourseService } from './course.service';
import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags, ApiOkResponse } from '@nestjs/swagger';

@ApiTags('courses')
@Controller('courses')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Get('coursera')
  async findCourses(@Query('q') query: string) {
    return this.courseService.getCourseraCourses(query || 'machine learning');
  }

  @Get('udemy')
  @ApiOkResponse()
  async getUdemyCourses(@Query('q') query: string) {
    return this.courseService.getUdemyCourses(query || 'python');
  }
}

