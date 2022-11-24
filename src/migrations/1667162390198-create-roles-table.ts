import { MigrationInterface, QueryRunner, Table } from 'typeorm';

import { TableName } from '%common/constants';

export class createRolesTable1667162390198 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: TableName.roles,
        columns: [
          {
            name: 'version',
            type: 'int4',
          },
          {
            name: 'id',
            type: 'uuid',
            isGenerated: true,
            generationStrategy: 'uuid',
            isPrimary: true,
          },
          {
            name: 'name',
            type: 'varchar',
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
