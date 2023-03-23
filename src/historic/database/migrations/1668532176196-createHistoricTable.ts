import { MigrationInterface, QueryRunner } from "typeorm";

export class createHistoricTable1668532176196 implements MigrationInterface {
    name = 'createHistoricTable1668532176196'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."journal_history_action_enum" AS ENUM('SoftDelete', 'Delete', 'Add', 'Update', 'Restore', 'Access', 'Unknown')`);
        await queryRunner.query(`CREATE TABLE "journal_history" ("id" SERIAL NOT NULL, "uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "creatoIl" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "modificatoIl" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "cancellatoIl" TIMESTAMP, "entity" character varying NOT NULL, "recordId" integer NOT NULL, "userId" integer NOT NULL, "username" character varying NOT NULL, "message" character varying NOT NULL, "action" "public"."journal_history_action_enum" NOT NULL, "snapshot" jsonb, CONSTRAINT "PK_0e742eb3151297c2e543f4e8cbd" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_0e742eb3151297c2e543f4e8cb" ON "journal_history" ("id") `);
        await queryRunner.query(`CREATE INDEX "IDX_71ed05fd3ddfb3ab6de6b1b82b" ON "journal_history" ("uuid") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."IDX_71ed05fd3ddfb3ab6de6b1b82b"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_0e742eb3151297c2e543f4e8cb"`);
        await queryRunner.query(`DROP TABLE "journal_history"`);
        await queryRunner.query(`DROP TYPE "public"."journal_history_action_enum"`);
    }

}
