import { Exclude } from 'class-transformer';
import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  RelationId,
  UpdateDateColumn,
  VersionColumn,
  // VirtualColumn,
} from 'typeorm';

import { TableName } from '%common/constants';
import { PasswordHelper } from '%common/helpers';
import { Role } from '%modules/roles';

const passwordHelper = new PasswordHelper();

@Entity({ name: TableName.users })
export class User {
  @VersionColumn()
  _version: number;

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  username: string;

  @Exclude()
  @Column()
  password: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  // @VirtualColumn({ default: true })
  // isActive: boolean;

  @Column({ unique: true })
  email: string;

  @Column({ unique: true })
  phoneNumber: string;

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

  @JoinTable({ name: TableName.usersRoles })
  @ManyToMany(() => Role, (roles) => roles.users, { cascade: true })
  roles: Role[];

  @RelationId((user: User) => user.roles)
  roleIds: number[];
}
