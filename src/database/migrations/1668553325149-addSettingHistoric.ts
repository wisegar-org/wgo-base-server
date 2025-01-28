import { MigrationInterface, QueryRunner } from "typeorm";

export class addSettingHistoric1668553325149 implements MigrationInterface {
    name = 'addSettingHistoric1668553325149'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "settings" ADD "uuid" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "settings" ADD "creatoIl" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone`);
        await queryRunner.query(`ALTER TABLE "settings" ADD "modificatoIl" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone`);
        await queryRunner.query(`ALTER TABLE "settings" ADD "cancellatoIl" TIMESTAMP`);
        await queryRunner.query(`CREATE INDEX "IDX_0669fe20e252eb692bf4d34497" ON "settings" ("id") `);
        await queryRunner.query(`CREATE INDEX "IDX_4ede76208970cde9dc26f4a4f8" ON "settings" ("uuid") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."IDX_4ede76208970cde9dc26f4a4f8"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_0669fe20e252eb692bf4d34497"`);
        await queryRunner.query(`ALTER TABLE "settings" DROP COLUMN "cancellatoIl"`);
        await queryRunner.query(`ALTER TABLE "settings" DROP COLUMN "modificatoIl"`);
        await queryRunner.query(`ALTER TABLE "settings" DROP COLUMN "creatoIl"`);
        await queryRunner.query(`ALTER TABLE "settings" DROP COLUMN "uuid"`);
    }

}
