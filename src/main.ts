// TODO: use config module
import 'dotenv/config';

import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';

import { getLogLevels } from './common/helpers';
import { AppModule } from './modules/app';
import { TypeOrmExceptionFilters } from './filters';

const PORT = process.env.PORT || 3000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: getLogLevels(process.env.NODE_ENV),
  });

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new TypeOrmExceptionFilters());

  await app.listen(PORT, () => {
    console.info(`Server started on port ${PORT}`);
  });
}

bootstrap();
