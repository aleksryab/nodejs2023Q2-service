import 'dotenv/config';
import { NestFactory, Reflector } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule } from '@nestjs/swagger';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from './auth/auth.guard';
import { AppModule } from './app.module';
import { ErrorsInterceptor } from './errors';
import { getApiDoc, startServerMessage } from './utils';

const PORT = process.env.PORT || 4000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const apiDoc = await getApiDoc();
  SwaggerModule.setup('doc', app, apiDoc);

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  const reflector = app.get(Reflector);
  app.useGlobalGuards(new AuthGuard(new JwtService(), reflector));
  app.useGlobalInterceptors(new ErrorsInterceptor());

  await app.listen(PORT, () => startServerMessage(PORT));
}

bootstrap();
