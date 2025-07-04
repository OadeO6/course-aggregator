import { Injectable, Logger } from '@nestjs/common';
import axios from 'axios';
import { CourseraCourse } from './types/coursera-course.type';

@Injectable()
export class CourseraProvider {
  private readonly logger = new Logger(CourseraProvider.name);

  private readonly endpoint = 'https://www.coursera.org/graphql-gateway?opname=Search';

  async fetchCourses(query: string, index: number = 0, limit: number = 10): Promise<CourseraCourse[]> {
    try {
      const payload = [{
        operationName: 'Search',
        variables: {
          requests: [
            {
              entityType: 'PRODUCTS',
              query,
              limit: limit,
              disableRecommender: true,
              maxValuesPerFacet: 1000,
              cursor: `${index}`,
              facetFilters: [],
            },
          ],
        },
        query: `
          query Search($requests: [Search_Request!]!) {
            SearchResult {
              search(requests: $requests) {
                elements {
                  ...SearchProductHit
                }
              }
            }
          }

          fragment SearchProductHit on Search_ProductHit {
            name
            imageUrl
            url
            avgProductRating
            numProductRatings
            skills
            productDifficultyLevel
          }
        `,
      }];

      const response = await axios.post(this.endpoint, payload, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'apollographql-client-name': 'search-v2',
          'apollographql-client-version': 'public',
          'User-Agent': 'Mozilla/5.0',
        },
      });

      const rawCourses = response.data[0]?.data?.SearchResult?.search[0]?.elements || [];

      console.log('a', rawCourses)
      if (!rawCourses.length) {
        this.logger.warn('No Coursera courses found.');
        return [];
      }
      console.log(rawCourses)

      const courses: CourseraCourse[] = rawCourses.map((el) => ({
        title: el.name,
        image: el.imageUrl,
        rating: el.avgProductRating?.toString() || 'N/A',
        reviews: el.numProductRatings?.toString() || '0',
        provider: el.partners?.join(', ') || 'Coursera',
        skills: el.skills || [],
        difficulty: el.productDifficultyLevel || 'N/A',
        url: `https://www.coursera.org${el.url}`,


      }));

      console.log(courses)
      return courses;
    } catch (error) {
      this.logger.error('Error fetching Coursera courses', error);
      return [];
    }
  }
}
