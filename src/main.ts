import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Course Aggregator API')
    .setDescription('API to fetch courses from Coursera, Udemy, etc.')
    .setVersion('1.0')
    .addTag('courses')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document); // URL: http://localhost:3000/docs

  await app.listen(3500);
}
bootstrap();
