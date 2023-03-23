import { MigrationInterface, QueryRunner } from "typeorm";

export class addLanguageHistoric1668550415911 implements MigrationInterface {
    name = 'addLanguageHistoric1668550415911'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "languages" ADD "uuid" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "languages" ADD "creatoIl" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone`);
        await queryRunner.query(`ALTER TABLE "languages" ADD "modificatoIl" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone`);
        await queryRunner.query(`ALTER TABLE "languages" ADD "cancellatoIl" TIMESTAMP`);
        await queryRunner.query(`CREATE INDEX "IDX_b517f827ca496b29f4d549c631" ON "languages" ("id") `);
        await queryRunner.query(`CREATE INDEX "IDX_4d60fce1da3ff986a5da4cd023" ON "languages" ("uuid") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."IDX_4d60fce1da3ff986a5da4cd023"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_b517f827ca496b29f4d549c631"`);
        await queryRunner.query(`ALTER TABLE "languages" DROP COLUMN "cancellatoIl"`);
        await queryRunner.query(`ALTER TABLE "languages" DROP COLUMN "modificatoIl"`);
        await queryRunner.query(`ALTER TABLE "languages" DROP COLUMN "creatoIl"`);
        await queryRunner.query(`ALTER TABLE "languages" DROP COLUMN "uuid"`);
    }

}
