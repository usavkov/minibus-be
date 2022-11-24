import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  UseInterceptors,
} from '@nestjs/common';

import { RoleName } from '%common/constants';
import { Roles, RequirePermissions, UseLogging } from '%common/decorators';

import { CreateUserDto } from './dto';
import { UsersService } from './users.service';

// TODO: properly implement policies handling
import usersPermissions from './users.permissions';

@UseLogging()
@UseInterceptors(ClassSerializerInterceptor)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Roles(RoleName.admin, RoleName.support)
  @RequirePermissions(...usersPermissions.getAll)
  @Get()
  async getAllUsers() {
    return this.usersService.findAll();
  }

  @Roles(RoleName.admin, RoleName.support, RoleName.user)
  @RequirePermissions(...usersPermissions.getById)
  @Get(':id')
  async getUser(@Param('id', ParseUUIDPipe) id: string) {
    return this.usersService.findOneByIdOrFail(id);
  }

  @Roles(RoleName.admin, RoleName.support)
  @RequirePermissions(...usersPermissions.create)
  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }
}
