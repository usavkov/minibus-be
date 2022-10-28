import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Post,
  Param,
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

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Roles(Role.admin, Role.support, Role.user)
  @RequirePermissions(...usersPermissions.getAll)
  @Get()
  async getAllUsers(@Req() req: Request) {
    // console.log(req);
    return this.usersService.findAll();
  }

  @Roles(Role.admin, Role.support, Role.user)
  @RequirePermissions(...usersPermissions.getById)
  @Get(':id')
  async getUser(@Param('id') id: string) {
    return this.usersService.findOneById(id);
  }
}
