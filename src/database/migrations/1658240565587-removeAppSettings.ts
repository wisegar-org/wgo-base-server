import { MigrationInterface, QueryRunner } from "typeorm";

export class removeAppSettings1658240565587 implements MigrationInterface {
  name = "removeAppSettings1658240565587";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DELETE FROM settings WHERE "type_settings" = 'WGO_APP_SETTINGS'`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
