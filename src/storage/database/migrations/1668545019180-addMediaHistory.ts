import { MigrationInterface, QueryRunner } from "typeorm";

export class addMediaHistory1668545019180 implements MigrationInterface {
  name = "addMediaHistory1668545019180";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "media" ADD "uuid" uuid NOT NULL DEFAULT uuid_generate_v4()`
    );
    await queryRunner.query(
      `ALTER TABLE "media" ADD "creatoIl" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone`
    );
    await queryRunner.query(
      `ALTER TABLE "media" ADD "modificatoIl" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone`
    );
    await queryRunner.query(`ALTER TABLE "media" ADD "cancellatoIl" TIMESTAMP`);
    await queryRunner.query(
      `CREATE INDEX "IDX_f4e0fcac36e050de337b670d8b" ON "media" ("id") `
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_2d6760ea1f49ca137ddc33620b" ON "media" ("uuid") `
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX "public"."IDX_2d6760ea1f49ca137ddc33620b"`
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_f4e0fcac36e050de337b670d8b"`
    );
    await queryRunner.query(`ALTER TABLE "media" DROP COLUMN "cancellatoIl"`);
    await queryRunner.query(`ALTER TABLE "media" DROP COLUMN "modificatoIl"`);
    await queryRunner.query(`ALTER TABLE "media" DROP COLUMN "creatoIl"`);
    await queryRunner.query(`ALTER TABLE "media" DROP COLUMN "uuid"`);
  }
}
