import { MigrationInterface, QueryRunner } from "typeorm";

export class addNewFieldsOnMedia1668894746262 implements MigrationInterface {
    name = 'addNewFieldsOnMedia1668894746262'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "media" ADD "mediaType" character varying NOT NULL DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE "media" ADD "path" character varying DEFAULT ''`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "media" DROP COLUMN "path"`);
        await queryRunner.query(`ALTER TABLE "media" DROP COLUMN "mediaType"`);
    }

}
