import { MigrationInterface, QueryRunner } from "typeorm";

export class addTemplateHistoric1668553582516 implements MigrationInterface {
    name = 'addTemplateHistoric1668553582516'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "templates" ADD "uuid" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "templates" ADD "creatoIl" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone`);
        await queryRunner.query(`ALTER TABLE "templates" ADD "modificatoIl" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone`);
        await queryRunner.query(`ALTER TABLE "templates" ADD "cancellatoIl" TIMESTAMP`);
        await queryRunner.query(`CREATE INDEX "IDX_515948649ce0bbbe391de702ae" ON "templates" ("id") `);
        await queryRunner.query(`CREATE INDEX "IDX_ee9c72fc1cb3523d2bcff3e4ca" ON "templates" ("uuid") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."IDX_ee9c72fc1cb3523d2bcff3e4ca"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_515948649ce0bbbe391de702ae"`);
        await queryRunner.query(`ALTER TABLE "templates" DROP COLUMN "cancellatoIl"`);
        await queryRunner.query(`ALTER TABLE "templates" DROP COLUMN "modificatoIl"`);
        await queryRunner.query(`ALTER TABLE "templates" DROP COLUMN "creatoIl"`);
        await queryRunner.query(`ALTER TABLE "templates" DROP COLUMN "uuid"`);
    }

}
