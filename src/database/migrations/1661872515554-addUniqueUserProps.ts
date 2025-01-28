import { MigrationInterface, QueryRunner } from "typeorm";

export class addUniqueUserProps1661872515554 implements MigrationInterface {
  name = "addUniqueUserProps1661872515554";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" ADD CONSTRAINT "UQ_226bb9aa7aa8a69991209d58f59" UNIQUE ("userName")`
    );
    await queryRunner.query(
      `ALTER TABLE "users" ALTER COLUMN "code" DROP NOT NULL`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" ALTER COLUMN "code" SET NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "users" DROP CONSTRAINT "UQ_226bb9aa7aa8a69991209d58f59"`
    );
  }
}
