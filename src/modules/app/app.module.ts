import { MiddlewareConsumer, Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import {
  AuthModule,
  JwtAuthGuard,
  PermissionsGuard,
  RolesGuard,
} from '%modules/auth';
import { ConfigService } from '%modules/config';
import { PermissionsModule } from '%modules/permissions';
import { RolesModule } from '%modules/roles';
import { UsersModule } from '%modules/users';

import { typeOrmModuleOptions } from '../../../typeorm.config';
import { LoggerMiddleware } from '../../middleware';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot(),
    PermissionsModule,
    RolesModule,
    TypeOrmModule.forRoot(typeOrmModuleOptions),
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
