import { Exclude } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  VersionColumn,
  // VirtualColumn,
} from 'typeorm';

@Entity({ name: 'users' })
export class User {
  @VersionColumn()
  _version: number;

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  username: string;

  @Exclude()
  @Column({ select: false })
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
  roles: string[];

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
}
