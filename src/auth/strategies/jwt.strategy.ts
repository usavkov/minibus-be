import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    // TODO: make invalidation of token on some actions like change permissions, roles, etc.
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      // TODO: probaly should to use config service
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  // TODO: replace 'any' type
  async validate(payload: any) {
    // return { username: payload.username }; TODO: adhust payload
    return payload;
  }
}
