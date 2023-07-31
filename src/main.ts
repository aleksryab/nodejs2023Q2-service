import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ErrorsInterceptor } from './errors';
import { getApiDoc, startServerMessage } from './utils';

const PORT = process.env.PORT || 4000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const apiDoc = await getApiDoc();
  SwaggerModule.setup('doc', app, apiDoc);

  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.useGlobalInterceptors(new ErrorsInterceptor());

  await app.listen(PORT, () => startServerMessage(PORT));
}

bootstrap();
