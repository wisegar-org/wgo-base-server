import { MigrationInterface, QueryRunner } from "typeorm";

export class addRoleHistoric1668897491219 implements MigrationInterface {
    name = 'addRoleHistoric1668897491219'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "roles" ADD "uuid" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "roles" ADD "creatoIl" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone`);
        await queryRunner.query(`ALTER TABLE "roles" ADD "modificatoIl" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone`);
        await queryRunner.query(`ALTER TABLE "roles" ADD "cancellatoIl" TIMESTAMP`);
        await queryRunner.query(`CREATE INDEX "IDX_c1433d71a4838793a49dcad46a" ON "roles" ("id") `);
        await queryRunner.query(`CREATE INDEX "IDX_cdc7776894e484eaed828ca061" ON "roles" ("uuid") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."IDX_cdc7776894e484eaed828ca061"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_c1433d71a4838793a49dcad46a"`);
        await queryRunner.query(`ALTER TABLE "roles" DROP COLUMN "cancellatoIl"`);
        await queryRunner.query(`ALTER TABLE "roles" DROP COLUMN "modificatoIl"`);
        await queryRunner.query(`ALTER TABLE "roles" DROP COLUMN "creatoIl"`);
        await queryRunner.query(`ALTER TABLE "roles" DROP COLUMN "uuid"`);
    }

}
