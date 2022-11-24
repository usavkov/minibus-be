import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm';

import { TableName } from '%common/constants';
import { User } from '%modules/users';

@Entity({ name: TableName.roles })
export class Role {
  @VersionColumn()
  _version: number;

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string;

  // ---
  @Column('text', {
    array: true,
  })
  permissions: string[];

  // ---

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;

  @DeleteDateColumn()
  deletedDate: Date;

  // ---

  @ManyToMany(() => User, (users) => users.roles)
  users: string[];
}
