import { MigrationInterface, QueryRunner } from "typeorm";

export class addContactMeEntity1658932057343 implements MigrationInterface {
    name = 'addContactMeEntity1658932057343'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "contact_me" ("id" SERIAL NOT NULL, "contactName" character varying NOT NULL DEFAULT '', "address" character varying NOT NULL DEFAULT '', "email" character varying NOT NULL DEFAULT '', "phoneNumber" character varying NOT NULL DEFAULT '', "mapPath" character varying NOT NULL DEFAULT '', CONSTRAINT "PK_6e478c5edf2634d0f2aa18f541a" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "contact_me"`);
    }

}
