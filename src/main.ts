import 'dotenv/config';
import { readFile } from 'fs/promises';
import { join } from 'path';
import { parse } from 'yaml';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { startServerMessage } from './utils/startServerMessage';

const PORT = process.env.PORT || 4000;
const apiDocPath = join(__dirname, '../doc/api.yaml');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const apiDocContent = await readFile(apiDocPath, 'utf-8');
  const apiDoc = parse(apiDocContent);
  SwaggerModule.setup('doc', app, apiDoc);

  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  await app.listen(PORT, () => startServerMessage(PORT));
}

bootstrap();
