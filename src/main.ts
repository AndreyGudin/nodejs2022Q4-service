import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as dotenv from 'dotenv';
dotenv.config();

import { AppModule } from './app.module';
import { CustomLogger } from './customLogger/customLogger.service';
import { LoggingInterceptor } from './customLogger/logging.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: new CustomLogger(),
  });
  const PORT = process.env.PORT || 4001;
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new LoggingInterceptor());
  const config = new DocumentBuilder()
    .setTitle('Audio Library')
    .setDescription('The Audio Library API description')
    .setVersion('1.0')
    .addTag('lib')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
}
bootstrap();
