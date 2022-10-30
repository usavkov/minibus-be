import { Injectable, Logger, LoggerService } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { User, UsersService } from '%modules/users';
import { CreateUserDto } from '%modules/users/dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService
  ) {}

  private readonly logger: LoggerService = new Logger(AuthService.name);

  // TODO: use bcrypt to encrypt/decrypt password
  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOneBy({ username });

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

  async login(user: Partial<User>) {
    // TODO: adjust user fields with schema
    const payload = {
      sub: user.id,
      username: user.username,
      roles: user.roles,
      permissions: user.permissions,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(user: CreateUserDto) {
    return this.usersService.create(user);
  }
}
