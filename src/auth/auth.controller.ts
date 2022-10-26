import {
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';

import { Public } from '../common/decorators';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Public()
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Get('test')
  async test(@Request() req) {
    return req.user;
  }
}
