import { MigrationInterface, QueryRunner } from "typeorm";

export class addLanguageEntity1656012423678 implements MigrationInterface {
  name = "addLanguageEntity1656012423678";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "languages" ("id" SERIAL NOT NULL, "code" character varying NOT NULL DEFAULT '', "enabled" boolean NOT NULL DEFAULT false, "default" boolean NOT NULL DEFAULT false, CONSTRAINT "PK_b517f827ca496b29f4d549c631d" PRIMARY KEY ("id"))`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "languages"`);
  }
}
