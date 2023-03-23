import { MigrationInterface, QueryRunner } from "typeorm";

export class fixAdminPassword1658417129112 implements MigrationInterface {
  name = "fixAdminPassword1658417129112";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DELETE FROM users WHERE "email" = 'admin@wisegar.org'`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
