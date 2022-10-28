import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';

import { Public, RequirePermissions, UseLogging } from '@common/decorators';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards';

import type { Request } from 'express';

@UseLogging()
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Public()
  @Post('login')
  async login(@Req() req: Request) {
    return this.authService.login(req.user);
  }

  @RequirePermissions('test')
  @Get('test')
  async test(@Req() req: Request) {
    return req.user;
  }
}
