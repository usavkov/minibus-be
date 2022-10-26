import {
  Controller,
  Get,
  Request,
} from '@nestjs/common';

import { Public } from '../common/decorators';

@Controller('users')
export class UsersController {
  @Get(':id')
  async getUser(@Request() req) {
    return req.user;
  }
}
