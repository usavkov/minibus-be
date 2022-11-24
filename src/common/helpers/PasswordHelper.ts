import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

const SALT_ROUNDS = 12;

@Injectable()
export class PasswordHelper {
  static async encrypt(password: string): Promise<string> {
    return bcrypt
      .genSalt(SALT_ROUNDS)
      .then((salt) => bcrypt.hash(password, salt));
  }

  static async compare(plainPassword: string, hash: string): Promise<boolean> {
    return bcrypt.compare(plainPassword, hash);
  }
}
