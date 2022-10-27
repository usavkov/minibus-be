import { MiddlewareConsumer, Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';

import { LoggerMiddleware } from '@common/middleware';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {
  AuthModule,
  JwtAuthGuard,
  PermissionsGuard,
  RolesGuard,
} from '../../modules/auth';
import { DatabaseModule } from '../../modules/database';
import { UsersModule } from '../../modules/users';

@Module({
  imports: [AuthModule, DatabaseModule, UsersModule],
  controllers: [AppController],
  providers: [
    AppService,
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
