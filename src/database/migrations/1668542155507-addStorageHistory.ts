import { MigrationInterface, QueryRunner } from "typeorm";

export class addStorageHistory1668542155507 implements MigrationInterface {
  name = "addStorageHistory1668542155507";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "storage" ADD "uuid" uuid NOT NULL DEFAULT uuid_generate_v4()`
    );
    await queryRunner.query(
      `ALTER TABLE "storage" ADD "creatoIl" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone`
    );
    await queryRunner.query(
      `ALTER TABLE "storage" ADD "modificatoIl" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone`
    );
    await queryRunner.query(
      `ALTER TABLE "storage" ADD "cancellatoIl" TIMESTAMP`
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_f9b67a9921474d86492aad2e02" ON "storage" ("id") `
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_2b5734f284b208b1d7502f3baa" ON "storage" ("uuid") `
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX "public"."IDX_2b5734f284b208b1d7502f3baa"`
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_f9b67a9921474d86492aad2e02"`
    );
    await queryRunner.query(`ALTER TABLE "storage" DROP COLUMN "cancellatoIl"`);
    await queryRunner.query(`ALTER TABLE "storage" DROP COLUMN "modificatoIl"`);
    await queryRunner.query(`ALTER TABLE "storage" DROP COLUMN "creatoIl"`);
    await queryRunner.query(`ALTER TABLE "storage" DROP COLUMN "uuid"`);
  }
}
