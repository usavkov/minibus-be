import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

import { TableName } from '%common/constants';

export class createUsersRolesTable1667162412633 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: TableName.usersRoles,
        columns: [
          {
            name: 'user_id',
            type: 'uuid',
          },
          {
            name: 'role_id',
            type: 'uuid',
          },
        ],
      })
    );

    await queryRunner.createForeignKey(
      TableName.usersRoles,
      new TableForeignKey({
        name: 'users_roles_users',
        columnNames: ['user_id'],
        referencedTableName: TableName.users,
        referencedColumnNames: ['id'],
      })
    );

    await queryRunner.createForeignKey(
      TableName.usersRoles,
      new TableForeignKey({
        name: 'users_roles_roles',
        columnNames: ['role_id'],
        referencedTableName: TableName.roles,
        referencedColumnNames: ['id'],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
