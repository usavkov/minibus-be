import 'dotenv/config';

import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DataSource, DataSourceOptions } from 'typeorm';

const { NODE_ENV, PG_HOST, PG_PORT, PG_USER, PG_PASSWORD, PG_DB } = process.env;

const isDev = NODE_ENV !== 'production';

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: PG_HOST,
  port: +PG_PORT,
  username: PG_USER,
  password: PG_PASSWORD,
  database: PG_DB,
  entities: ['dist/**/*.entity.js'],
  migrations: ['dist/src/migrations/*.js'],
};

export const typeOrmModuleOptions: TypeOrmModuleOptions = {
  ...dataSourceOptions,
  synchronize: isDev,
  autoLoadEntities: true,
};

export default new DataSource(dataSourceOptions);
