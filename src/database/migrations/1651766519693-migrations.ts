import { MigrationInterface, QueryRunner } from "typeorm";

export class migrations1651766519693 implements MigrationInterface {
    name = 'migrations1651766519693'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "name" character varying NOT NULL DEFAULT '', "lastName" character varying NOT NULL DEFAULT '', "userName" character varying NOT NULL DEFAULT '', "email" character varying NOT NULL DEFAULT '', "password" character varying NOT NULL DEFAULT '', "isEmailConfirmed" boolean NOT NULL DEFAULT false, "confirmationToken" character varying, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
