import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Req,
  UseInterceptors,
} from '@nestjs/common';
import { Request } from 'express';

import { Role } from '%common/constants';
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

  @Roles(Role.admin, Role.support)
  @RequirePermissions(...usersPermissions.getAll)
  @Get()
  async getAllUsers(@Req() req: Request) {
    console.log(req.user);
    return this.usersService.findAll();
  }

  @Roles(Role.admin, Role.support, Role.user)
  @RequirePermissions(...usersPermissions.getById)
  @Get(':id')
  async getUser(@Param('id', ParseUUIDPipe) id: string) {
    return this.usersService.findOneById(id);
  }

  @Roles(Role.admin, Role.support)
  @RequirePermissions(...usersPermissions.create)
  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }
}
