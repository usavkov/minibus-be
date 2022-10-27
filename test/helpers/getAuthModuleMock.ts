import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { Test, TestingModule } from '@nestjs/testing';

import {
  AuthController,
  AuthService,
  JwtStrategy,
  LocalStrategy,
} from '@modules/auth';
import { UsersModule } from '@modules/users';

const SECRET = 'secret';
process.env.JWT_SECRET = SECRET;

export const getAuthModuleMock = (): Promise<TestingModule> =>
  Test.createTestingModule({
    imports: [
      JwtModule.register({
        secret: SECRET,
        signOptions: { expiresIn: '60s' },
      }),
      PassportModule,
      UsersModule,
    ],
    controllers: [AuthController],
    providers: [AuthService, JwtStrategy, LocalStrategy],
  }).compile();
