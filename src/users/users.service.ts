import { Injectable } from '@nestjs/common';

export type User = any;

@Injectable()
export class UsersService {
  // TODO: connect to db and select user
  private readonly users = [
    {
      userId: 1,
      username: 'john',
      password: 'changeme',
      roles: ['user'],
      perms: ['profile-settings.item.get', 'users.item.get'],
    },
    {
      userId: 2,
      username: 'maria',
      password: 'guess',
    },
  ];

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find((user) => user.username === username);
  }
}
