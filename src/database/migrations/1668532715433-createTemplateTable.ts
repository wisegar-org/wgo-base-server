import { MigrationInterface, QueryRunner } from "typeorm";

export class createTemplateTable1668532715433 implements MigrationInterface {
    name = 'createTemplateTable1668532715433'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "templates" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "body" text NOT NULL, "documentType" character varying NOT NULL DEFAULT '', CONSTRAINT "PK_515948649ce0bbbe391de702ae5" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "templates"`);
    }

}
