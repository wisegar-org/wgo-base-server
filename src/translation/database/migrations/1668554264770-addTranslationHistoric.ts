import { MigrationInterface, QueryRunner } from "typeorm";

export class addTranslationHistoric1668554264770 implements MigrationInterface {
    name = 'addTranslationHistoric1668554264770'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "translations" ADD "uuid" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "translations" ADD "creatoIl" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone`);
        await queryRunner.query(`ALTER TABLE "translations" ADD "modificatoIl" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone`);
        await queryRunner.query(`ALTER TABLE "translations" ADD "cancellatoIl" TIMESTAMP`);
        await queryRunner.query(`CREATE INDEX "IDX_aca248c72ae1fb2390f1bf4cd8" ON "translations" ("id") `);
        await queryRunner.query(`CREATE INDEX "IDX_f24fc2869d7b53ef295f93ad13" ON "translations" ("uuid") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."IDX_f24fc2869d7b53ef295f93ad13"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_aca248c72ae1fb2390f1bf4cd8"`);
        await queryRunner.query(`ALTER TABLE "translations" DROP COLUMN "cancellatoIl"`);
        await queryRunner.query(`ALTER TABLE "translations" DROP COLUMN "modificatoIl"`);
        await queryRunner.query(`ALTER TABLE "translations" DROP COLUMN "creatoIl"`);
        await queryRunner.query(`ALTER TABLE "translations" DROP COLUMN "uuid"`);
    }

}
