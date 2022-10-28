import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from '%entities/user.entity';

import type { FindOptionsWhere } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>
  ) {}
  // TODO: connect to db and select user

  async findOneBy(options: FindOptionsWhere<User>): Promise<User | undefined> {
    const res = await this.usersRepository.findOneBy(options);

    console.log(res);

    return;
  }

  async findOne(id: string): Promise<User | undefined> {
    const res = await this.findOneBy({ id });

    console.log(res);

    return;
  }
}
