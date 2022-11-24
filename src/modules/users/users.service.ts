import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { omit } from 'lodash/fp';
import {
  FindManyOptions,
  FindOneOptions,
  FindOptionsWhere,
  Repository,
} from 'typeorm';

import { RoleName } from '%common/constants';
import { PasswordHelper } from '%common/helpers';
import { RolesService } from '%modules/roles';

import { User } from './users.entity';

import type { CreateUserDto } from './dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,

    private rolesService: RolesService,
    private passwordHelper: PasswordHelper
  ) {}

  async create(
    createUserDto: CreateUserDto
  ): Promise<Omit<User, 'password'> | undefined> {
    const { password, ...newUser } = this.usersRepository.create(createUserDto);
    const encryptedPassword = await this.passwordHelper.encrypt(password);

    // TODO: upsert
    // Assign newly created user role - "user"
    const userRole = await this.rolesService.findOneBy({ name: RoleName.user });

    return this.usersRepository
      .save({
        ...newUser,
        password: encryptedPassword,
        roles: [userRole].filter(Boolean),
      })
      .then(omit('password'));
  }

  async findAll(options?: FindManyOptions<User>): Promise<User[] | undefined> {
    const res = await this.usersRepository.find(options);

    return res;
  }

  async findOneOrFail(
    options: FindOneOptions<User>
  ): Promise<User | undefined> {
    const res = await this.usersRepository.findOneOrFail(options);

    return res;
  }

  async findOneBy(options: FindOptionsWhere<User>): Promise<User | undefined> {
    const res = await this.usersRepository.findOneBy(options);

    return res;
  }

  async findOneByOrFail(
    options: FindOptionsWhere<User>
  ): Promise<User | undefined> {
    const res = await this.usersRepository.findOneByOrFail(options);

    return res;
  }

  async findOneByIdOrFail(id: string): Promise<User | undefined> {
    const res = await this.findOneByOrFail({ id });

    return res;
  }
}
