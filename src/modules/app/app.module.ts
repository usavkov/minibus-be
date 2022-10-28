import { MiddlewareConsumer, Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { LoggerMiddleware } from '%common/middleware';
import {
  AuthModule,
  JwtAuthGuard,
  PermissionsGuard,
  RolesGuard,
} from '%modules/auth';
import { ConfigService } from '%modules/config';
import { UsersModule } from '%modules/users';
import { AppController } from './app.controller';
import { AppService } from './app.service';

const { NODE_ENV, PG_HOST, PG_PORT, PG_USER, PG_PASSWORD, PG_DB } = process.env;

const isDev = NODE_ENV !== 'production';

@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: PG_HOST,
      port: +PG_PORT,
      username: PG_USER,
      password: PG_PASSWORD,
      database: PG_DB,
      synchronize: isDev,
      autoLoadEntities: true,
    }),
    UsersModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    ConfigService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    {
      provide: APP_GUARD,
      useClass: PermissionsGuard,
    },
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
