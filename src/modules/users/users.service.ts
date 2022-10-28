import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from './users.entity';

import type { FindManyOptions, FindOptionsWhere } from 'typeorm';
import type { CreateUserDto } from './dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User | undefined> {
    const newUser = this.usersRepository.create(createUserDto);

    return this.usersRepository.save(newUser);
  }

  async findAll(options?: FindManyOptions<User>): Promise<User[] | undefined> {
    const res = await this.usersRepository.find(options);

    return res;
  }

  async findOneBy(options: FindOptionsWhere<User>): Promise<User | undefined> {
    const res = await this.usersRepository.findOneByOrFail(options);

    return res;
  }

  async findOneById(id: string): Promise<User | undefined> {
    const res = await this.findOneBy({ id });

    console.log(res);

    return res;
  }
}
