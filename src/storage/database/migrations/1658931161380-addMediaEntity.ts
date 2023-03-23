import { MigrationInterface, QueryRunner } from "typeorm";

export class addMediaEntity1658931161380 implements MigrationInterface {
    name = 'addMediaEntity1658931161380'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "media" ("id" SERIAL NOT NULL, "displayName" character varying NOT NULL DEFAULT '', "fileName" character varying NOT NULL DEFAULT '', "fileExt" character varying NOT NULL DEFAULT '', "mimeType" character varying NOT NULL DEFAULT '', "fileContent" bytea NOT NULL, "isPublic" boolean DEFAULT false, CONSTRAINT "PK_f4e0fcac36e050de337b670d8bd" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "media"`);
    }

}
