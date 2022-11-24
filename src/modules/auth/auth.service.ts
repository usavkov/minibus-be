import { Injectable, Logger, LoggerService } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { PasswordHelper } from '%common/helpers';
import { User, UsersService } from '%modules/users';
import { CreateUserDto } from '%modules/users/dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
    private readonly passwordHelper: PasswordHelper
  ) {}

  private readonly logger: LoggerService = new Logger(AuthService.name);

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOneBy({ username });

    if (user && (await this.passwordHelper.compare(pass, user.password))) {
      // TODO: define fields, that should be ommited
      const { password: _, ...result } = user;

      return result;
    }

    // TODO: use constants instead of text
    this.logger.verbose(
      `INVALID CREDENTIALS. Input:\n---\n${JSON.stringify(
        { username, pass },
        null,
        2
      )}\n---`
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
