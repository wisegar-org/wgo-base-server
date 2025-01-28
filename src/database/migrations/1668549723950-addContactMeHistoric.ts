import { MigrationInterface, QueryRunner } from "typeorm";

export class addContactMeHistoric1668549723950 implements MigrationInterface {
  name = "addContactMeHistoric1668549723950";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "contact_me" ADD "uuid" uuid NOT NULL DEFAULT uuid_generate_v4()`
    );
    await queryRunner.query(
      `ALTER TABLE "contact_me" ADD "creatoIl" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone`
    );
    await queryRunner.query(
      `ALTER TABLE "contact_me" ADD "modificatoIl" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone`
    );
    await queryRunner.query(
      `ALTER TABLE "contact_me" ADD "cancellatoIl" TIMESTAMP`
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_6e478c5edf2634d0f2aa18f541" ON "contact_me" ("id") `
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_1302ff6810cc9ee7ba33bad320" ON "contact_me" ("uuid") `
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX "public"."IDX_1302ff6810cc9ee7ba33bad320"`
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_6e478c5edf2634d0f2aa18f541"`
    );
    await queryRunner.query(
      `ALTER TABLE "contact_me" DROP COLUMN "cancellatoIl"`
    );
    await queryRunner.query(
      `ALTER TABLE "contact_me" DROP COLUMN "modificatoIl"`
    );
    await queryRunner.query(`ALTER TABLE "contact_me" DROP COLUMN "creatoIl"`);
    await queryRunner.query(`ALTER TABLE "contact_me" DROP COLUMN "uuid"`);
  }
}
