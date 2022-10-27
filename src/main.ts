import 'dotenv/config';

import { NestFactory } from '@nestjs/core';

import { getLogLevels } from './common/helpers';
import { AppModule } from './modules/app';

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
