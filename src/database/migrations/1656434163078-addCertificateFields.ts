import { MigrationInterface, QueryRunner } from "typeorm";

export class addCertificateFields1656434163078 implements MigrationInterface {
  name = "addCertificateFields1656434163078";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" ADD "certificate" character varying NOT NULL DEFAULT ''`
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD "code" character varying NOT NULL DEFAULT ''`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "code"`);
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "certificate"`);
  }
}
