import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';

import { AuthService } from '../auth.service';

import type { User } from '%modules/users';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  private readonly logger = new Logger(LocalStrategy.name);

  async validate(username: string, password: string): Promise<User> {
    const now = Date.now();

    const user = await this.authService.validateUser(username, password);

    // TODO: unify logging
    this.logger.log((!!user ? ` User "${user.username}" was found` : 'User with such credentials was not found') + ` +${Date.now() - now}ms`);

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
