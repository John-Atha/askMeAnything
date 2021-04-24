import {MigrationInterface, QueryRunner} from "typeorm";

export class MakeQuestionTitleUnique1619292443667 implements MigrationInterface {
    name = 'MakeQuestionTitleUnique1619292443667'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "question" ADD CONSTRAINT "UQ_83ba3cab2514695c0cdf6b835f5" UNIQUE ("title")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "question" DROP CONSTRAINT "UQ_83ba3cab2514695c0cdf6b835f5"`);
    }

}
