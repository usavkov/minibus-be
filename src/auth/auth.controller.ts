import {
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';

import { Public, RequirePermissions, UseLogging } from '../common/decorators';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards';

@UseLogging()
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Public()
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @RequirePermissions('test')
  @Get('test')
  async test(@Request() req) {
    return req.user;
  }
}
