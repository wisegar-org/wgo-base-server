import { MigrationInterface, QueryRunner } from "typeorm";

export class addAuthHistoric1668548748218 implements MigrationInterface {
  name = "addAuthHistoric1668548748218";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" ADD "uuid" uuid NOT NULL DEFAULT uuid_generate_v4()`
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD "creatoIl" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone`
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD "modificatoIl" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone`
    );
    await queryRunner.query(`ALTER TABLE "users" ADD "cancellatoIl" TIMESTAMP`);
    await queryRunner.query(
      `CREATE INDEX "IDX_a3ffb1c0c8416b9fc6f907b743" ON "users" ("id") `
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_951b8f1dfc94ac1d0301a14b7e" ON "users" ("uuid") `
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX "public"."IDX_951b8f1dfc94ac1d0301a14b7e"`
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_a3ffb1c0c8416b9fc6f907b743"`
    );
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "cancellatoIl"`);
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "modificatoIl"`);
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "creatoIl"`);
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "uuid"`);
  }
}
