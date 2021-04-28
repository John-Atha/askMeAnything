import {MigrationInterface, QueryRunner} from "typeorm";

export class AddQuestionUpvotes1619613833878 implements MigrationInterface {
    name = 'AddQuestionUpvotes1619613833878'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "question_upvote" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "ownerId" integer NOT NULL, "questionId" integer NOT NULL, CONSTRAINT "PK_8f84f5275e8feee0f6e576e8cc8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "question_upvote" ADD CONSTRAINT "FK_a95dd05aa0d4d9e449ef236e44e" FOREIGN KEY ("ownerId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "question_upvote" ADD CONSTRAINT "FK_f31ceec27217cfa376e6924c0a5" FOREIGN KEY ("questionId") REFERENCES "question"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "question_upvote" DROP CONSTRAINT "FK_f31ceec27217cfa376e6924c0a5"`);
        await queryRunner.query(`ALTER TABLE "question_upvote" DROP CONSTRAINT "FK_a95dd05aa0d4d9e449ef236e44e"`);
        await queryRunner.query(`DROP TABLE "question_upvote"`);
    }

}
