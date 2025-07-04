import { Injectable, Logger } from '@nestjs/common';
import * as puppeteer from 'puppeteer';

@Injectable()
export class UdemyProvider {
  private readonly logger = new Logger(UdemyProvider.name);
  private readonly BASE_URL = 'https://www.udemy.com';

  async searchCourses(query: string): Promise<any[]> {
    const searchUrl = `${this.BASE_URL}/courses/search/?q=${encodeURIComponent(query)}`;

    const browser = await puppeteer.launch({
      headless: false,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });

    try {
      const page = await browser.newPage();
      await page.setUserAgent(
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 ' +
        '(KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36',
      );

      await page.goto(searchUrl, { waitUntil: 'networkidle2' });

      // Wait for course cards to load
      await page.waitForSelector('[class*="course-card--container"]', { timeout: 10000 });

      const courses = await page.evaluate(() => {
        const cards = Array.from(document.querySelectorAll('[class*="course-card--container"]'));

        return cards.map((card) => {
          const title = card.querySelector('h3')?.textContent?.trim() || '';
          const description = card.querySelector('[data-purpose="course-headline"]')?.textContent?.trim() || '';
          const instructor = card.querySelector('[data-purpose="visible-instructors"]')?.textContent?.trim() || '';
          const image = card.querySelector('img')?.getAttribute('src') || '';
          const rating = card.querySelector('[data-purpose="rating-number"]')?.textContent?.trim() || '';
          const reviews = card.querySelectorAll('li')?.[1]?.textContent?.trim() || '';
          const duration = card.querySelectorAll('li')?.[2]?.textContent?.trim() || '';
          const linkSuffix = card.querySelector('a')?.getAttribute('href') || '';
          const link = `https://www.udemy.com${linkSuffix}`;

          return { title, description, instructor, image, rating, reviews, duration, link };
        });
      });

      console.log(courses);
      return courses;
    } catch (error) {
      this.logger.error('Failed to scrape Udemy:', error);
      throw error;
    } finally {
      await browser.close();
    }
  }
}
