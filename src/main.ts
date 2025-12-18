import 'reflect-metadata';
import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.setGlobalPrefix('api/v1');
  app.enableShutdownHooks();

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // await app.listen(process.env.PORT || 3000);
  await app.listen(process.env.PORT || 3000, '0.0.0.0');
  // await app.listen('0.0.0.0');
  console.log(`🚀 Server running on port ${process.env.PORT || 3000}`)
}

bootstrap();
