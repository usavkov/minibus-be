import { Controller, Get, Param } from '@nestjs/common';

import { Role } from '%common/constants';
import { Roles, RequirePermissions, UseLogging } from '%common/decorators';
import { UsersService } from './users.service';

// TODO: properly implement policies handling
import usersPermissions from './users.permissions';

@UseLogging()
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Roles(Role.admin, Role.support, Role.user)
  @RequirePermissions(...usersPermissions.getById)
  @Get(':id')
  async getUser(@Param() id: string) {
    return this.usersService.findOne(id);
  }
}
