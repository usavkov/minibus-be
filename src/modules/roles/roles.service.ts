import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOptionsWhere, Repository } from 'typeorm';

import { CreateRoleDto } from './dto';
import { Role } from './roles.entity';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role)
    private rolesRepository: Repository<Role>
  ) {}

  async findAll(options?: FindManyOptions<Role>): Promise<Role[] | undefined> {
    const res = await this.rolesRepository.find(options);

    return res;
  }

  async create(createRoleDto: CreateRoleDto): Promise<Role | undefined> {
    const newUser = this.rolesRepository.create(createRoleDto);

    return this.rolesRepository.save(newUser);
  }

  async findOneBy(options: FindOptionsWhere<Role>): Promise<Role | undefined> {
    const res = await this.rolesRepository.findOneBy(options);

    return res;
  }

  async findOneByOrFail(
    options: FindOptionsWhere<Role>
  ): Promise<Role | undefined> {
    const res = await this.rolesRepository.findOneByOrFail(options);

    return res;
  }

  async findOneByIdOrFail(id: string): Promise<Role | undefined> {
    const res = await this.findOneByOrFail({ id });

    return res;
  }
}
