import { Controller, Get, Request } from '@nestjs/common';

import { Role } from '@common/constants';
import { Roles, RequirePermissions, UseLogging } from '@common/decorators';

// TODO: properly implement policies handling
import usersPermissions from './users.permissions';

@UseLogging()
@Controller('users')
export class UsersController {
  @Roles(Role.admin, Role.support, Role.user)
  @RequirePermissions(...usersPermissions.getById)
  @Get(':id')
  async getUser(@Request() req) {
    return req.user;
  }
}
