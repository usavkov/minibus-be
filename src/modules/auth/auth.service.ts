import { Injectable, Logger, LoggerService } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UsersService } from '../users';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService
  ) {}

  private readonly logger: LoggerService = new Logger(AuthService.name);

  // TODO: use bcrypt to encrypt/decrypt password
  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);

    if (user && user.password === pass) {
      // TODO: define fields, that should be ommited
      const { password, ...result } = user;

      return result;
    }

    // TODO: use constants instead of text
    this.logger.verbose(
      `INVALID CREDENTIALS. Input:\n---\n${JSON.stringify({ username, pass }, null, 2)}\n---`
    );

    return null;
  }

  async login(user: any) {
    console.log(this.logger);
    // TODO: adjust user fields with schema
    const payload = {
      username: user.username,
      sub: user.userId,
      ...user,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
