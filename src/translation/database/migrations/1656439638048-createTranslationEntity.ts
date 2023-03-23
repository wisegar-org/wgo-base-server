import { MigrationInterface, QueryRunner } from "typeorm";

export class createTranslationEntity1656439638048
  implements MigrationInterface
{
  name = "createTranslationEntity1656439638048";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "translations" ("id" SERIAL NOT NULL, "key" character varying NOT NULL, "value" character varying NOT NULL DEFAULT 'Empty', "languageId" integer, CONSTRAINT "PK_aca248c72ae1fb2390f1bf4cd87" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `ALTER TABLE "translations" ADD CONSTRAINT "FK_668111c72ac5c9eb05db93b9420" FOREIGN KEY ("languageId") REFERENCES "languages"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "translations" DROP CONSTRAINT "FK_668111c72ac5c9eb05db93b9420"`
    );
    await queryRunner.query(`DROP TABLE "translations"`);
  }
}
