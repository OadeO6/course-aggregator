import { Injectable } from '@nestjs/common';
import { CourseraProvider } from '../source/api/coursera.provider';
import { UdemyProvider } from 'src/source/scraper/udemy.provider';

@Injectable()
export class CourseService {
  constructor(
    private readonly udemyProvider: UdemyProvider,
    private coursera: CourseraProvider
  ) {}

  async getCourseraCourses(query: string) {
    const courseraCourses = await this.coursera.fetchCourses(query);
    return courseraCourses;
  }

  async getUdemyCourses(query: string) {
    return this.udemyProvider.searchCourses(query);
  }
}
