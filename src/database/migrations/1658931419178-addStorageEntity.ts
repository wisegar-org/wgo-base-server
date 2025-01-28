import { MigrationInterface, QueryRunner } from "typeorm";

export class addStorageEntity1658931419178 implements MigrationInterface {
    name = 'addStorageEntity1658931419178'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "storage" ("id" SERIAL NOT NULL, "type" character varying NOT NULL DEFAULT '', "content" json NOT NULL DEFAULT '{}', "imageId" integer, CONSTRAINT "PK_f9b67a9921474d86492aad2e027" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "storage_image_list_media" ("storageId" integer NOT NULL, "mediaId" integer NOT NULL, CONSTRAINT "PK_fc2959e9771c31a95a099175006" PRIMARY KEY ("storageId", "mediaId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_3469b7b9699c01e2b9c52e747f" ON "storage_image_list_media" ("storageId") `);
        await queryRunner.query(`CREATE INDEX "IDX_0c5c0815226e2a6ac1ec498090" ON "storage_image_list_media" ("mediaId") `);
        await queryRunner.query(`ALTER TABLE "storage" ADD CONSTRAINT "FK_5b52420a14be54c5fda9a956295" FOREIGN KEY ("imageId") REFERENCES "media"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "storage_image_list_media" ADD CONSTRAINT "FK_3469b7b9699c01e2b9c52e747fc" FOREIGN KEY ("storageId") REFERENCES "storage"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "storage_image_list_media" ADD CONSTRAINT "FK_0c5c0815226e2a6ac1ec498090e" FOREIGN KEY ("mediaId") REFERENCES "media"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "storage_image_list_media" DROP CONSTRAINT "FK_0c5c0815226e2a6ac1ec498090e"`);
        await queryRunner.query(`ALTER TABLE "storage_image_list_media" DROP CONSTRAINT "FK_3469b7b9699c01e2b9c52e747fc"`);
        await queryRunner.query(`ALTER TABLE "storage" DROP CONSTRAINT "FK_5b52420a14be54c5fda9a956295"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_0c5c0815226e2a6ac1ec498090"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_3469b7b9699c01e2b9c52e747f"`);
        await queryRunner.query(`DROP TABLE "storage_image_list_media"`);
        await queryRunner.query(`DROP TABLE "storage"`);
    }

}
