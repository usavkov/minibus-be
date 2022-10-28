import { Controller, Get, Req } from '@nestjs/common';

import { Role } from '@common/constants';
import { Roles, RequirePermissions, UseLogging } from '@common/decorators';

// TODO: properly implement policies handling
import usersPermissions from './users.permissions';

import type { Request } from 'express';

@UseLogging()
@Controller('users')
export class UsersController {
  @Roles(Role.admin, Role.support, Role.user)
  @RequirePermissions(...usersPermissions.getById)
  @Get(':id')
  async getUser(@Req() req: Request) {
    return req.user;
  }
}
