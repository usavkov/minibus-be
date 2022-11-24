import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PasswordHelper } from '%common/helpers';
import { RolesModule } from '%modules/roles';

import { UsersController } from './users.controller';
import { User } from './users.entity';
import { UsersService } from './users.service';

@Module({
  imports: [RolesModule, TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [UsersService, PasswordHelper],
  exports: [UsersService],
})
export class UsersModule {}
