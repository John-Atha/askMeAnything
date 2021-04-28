import {MigrationInterface, QueryRunner} from "typeorm";

export class AddAnswersUpvotes1619626818098 implements MigrationInterface {
    name = 'AddAnswersUpvotes1619626818098'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "answer_upvote" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "ownerId" integer NOT NULL, "answerId" integer NOT NULL, CONSTRAINT "PK_c107a55181086560e25e5648d0c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "answer_upvote" ADD CONSTRAINT "FK_092450dfefd04616117b9bf3d96" FOREIGN KEY ("ownerId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "answer_upvote" ADD CONSTRAINT "FK_e8be5f0ce0ad5c2c4da13571dca" FOREIGN KEY ("answerId") REFERENCES "answer"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "answer_upvote" DROP CONSTRAINT "FK_e8be5f0ce0ad5c2c4da13571dca"`);
        await queryRunner.query(`ALTER TABLE "answer_upvote" DROP CONSTRAINT "FK_092450dfefd04616117b9bf3d96"`);
        await queryRunner.query(`DROP TABLE "answer_upvote"`);
    }

}
