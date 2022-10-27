import 'dotenv/config';

import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { getLogLevels } from './common/helpers';

const PORT = process.env.PORT || 3000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: getLogLevels(process.env.NODE_ENV),
  });

  await app.listen(PORT, () => {
    console.info(`Server started on port ${PORT}`);
  });
}

bootstrap();
