import { MigrationInterface, QueryRunner } from "typeorm";

export class addLanguageAndProfile1668893995656 implements MigrationInterface {
    name = 'addLanguageAndProfile1668893995656'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "profileImageId" integer`);
        await queryRunner.query(`ALTER TABLE "users" ADD "languageId" integer`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_e6f8c136a8e286370ac3b5d73b6" FOREIGN KEY ("profileImageId") REFERENCES "media"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_43e931f63c91f094d879aeeea29" FOREIGN KEY ("languageId") REFERENCES "languages"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_43e931f63c91f094d879aeeea29"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_e6f8c136a8e286370ac3b5d73b6"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "languageId"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "profileImageId"`);
    }

}
