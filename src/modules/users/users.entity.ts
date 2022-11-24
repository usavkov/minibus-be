import { Exclude } from 'class-transformer';
import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  VersionColumn,
  // VirtualColumn,
} from 'typeorm';

import { TableName } from '%common/constants';
import { PasswordHelper } from '%common/helpers';
import { Role } from '%modules/roles';

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

  @ManyToMany(() => Role, (roles) => roles.users)
  roles: string[];

  // ---

  @BeforeInsert()
  private async encryptPassword(): Promise<void> {
    this.password = await PasswordHelper.encrypt(this.password);
  }
}
