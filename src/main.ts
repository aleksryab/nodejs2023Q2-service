import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'dotenv/config';

const PORT = process.env.PORT || 4000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(PORT, () =>
    console.log(
      '\x1b[36m%s\x1b[0m',
      `Server started on http://localhost:${PORT}/`,
    ),
  );
}

bootstrap();
