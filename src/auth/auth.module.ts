import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { ONE_DAY } from '../common/constants';
import { UsersModule } from '../users';
import { AuthService } from './auth.service';
import { JwtStrategy, LocalStrategy } from './strategies';
import { AuthController } from './auth.controller';

@Module({
  imports: [
    JwtModule.register({
      // TODO: probaly should to use config service
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: ONE_DAY },
    }),
    PassportModule,
    UsersModule,
  ],
  providers: [AuthService, JwtStrategy, LocalStrategy],
  controllers: [AuthController],
  exports: [AuthService, JwtStrategy, LocalStrategy],
})
export class AuthModule {}
