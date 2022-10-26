import {
  Controller,
  Get,
  Request,
} from '@nestjs/common';
import { Role } from 'src/common/constants';

import { Roles } from '../common/decorators';

@Controller('users')
export class UsersController {
  @Roles(Role.admin, Role.support)
  @Get(':id')
  async getUser(@Request() req) {
    return req.user;
  }
}
