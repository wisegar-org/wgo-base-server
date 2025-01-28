import { MigrationInterface, QueryRunner } from "typeorm";

export class addLanguageLogo1668895775452 implements MigrationInterface {
    name = 'addLanguageLogo1668895775452'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "languages" ADD "logoId" integer`);
        await queryRunner.query(`ALTER TABLE "languages" ADD CONSTRAINT "FK_1e4d7556eafd684cd5c4a3fc803" FOREIGN KEY ("logoId") REFERENCES "media"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "languages" DROP CONSTRAINT "FK_1e4d7556eafd684cd5c4a3fc803"`);
        await queryRunner.query(`ALTER TABLE "languages" DROP COLUMN "logoId"`);
    }

}
