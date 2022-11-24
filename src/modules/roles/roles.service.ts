import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Repository } from 'typeorm';

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
}
