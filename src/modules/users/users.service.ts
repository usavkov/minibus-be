import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOptionsWhere, Repository } from 'typeorm';

import { RolesService } from '%modules/roles';

import { User } from './users.entity';

import type { CreateUserDto } from './dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,

    private rolesService: RolesService
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User | undefined> {
    const newUser = this.usersRepository.create(createUserDto);

    console.log('newUser', newUser);

    return this.usersRepository.save(newUser);
  }

  async findAll(options?: FindManyOptions<User>): Promise<User[] | undefined> {
    const res = await this.usersRepository.find(options);

    // TODO: remove - it's just to see results
    console.log(await this.rolesService.findAll());

    return res;
  }

  async findOneBy(options: FindOptionsWhere<User>): Promise<User | undefined> {
    const res = await this.usersRepository.findOneByOrFail(options);

    return res;
  }

  async findOneById(id: string): Promise<User | undefined> {
    const res = await this.findOneBy({ id });

    return res;
  }
}
