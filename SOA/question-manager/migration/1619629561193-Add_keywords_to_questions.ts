import {MigrationInterface, QueryRunner} from "typeorm";

export class AddKeywordsToQuestions1619629561193 implements MigrationInterface {
    name = 'AddKeywordsToQuestions1619629561193'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "keyword" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "UQ_c37917986ab4672d78f5e037ec3" UNIQUE ("name"), CONSTRAINT "PK_affdb8c8fa5b442900cb3aa21dc" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "keyword_questions_question" ("keywordId" integer NOT NULL, "questionId" integer NOT NULL, CONSTRAINT "PK_c5b4a838ab3f700636b1f865783" PRIMARY KEY ("keywordId", "questionId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_aefb52695dd14f10dbebf97ff7" ON "keyword_questions_question" ("keywordId") `);
        await queryRunner.query(`CREATE INDEX "IDX_c7daafbc33757e9e86c15730fc" ON "keyword_questions_question" ("questionId") `);
        await queryRunner.query(`ALTER TABLE "keyword_questions_question" ADD CONSTRAINT "FK_aefb52695dd14f10dbebf97ff78" FOREIGN KEY ("keywordId") REFERENCES "keyword"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "keyword_questions_question" ADD CONSTRAINT "FK_c7daafbc33757e9e86c15730fcc" FOREIGN KEY ("questionId") REFERENCES "question"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "keyword_questions_question" DROP CONSTRAINT "FK_c7daafbc33757e9e86c15730fcc"`);
        await queryRunner.query(`ALTER TABLE "keyword_questions_question" DROP CONSTRAINT "FK_aefb52695dd14f10dbebf97ff78"`);
        await queryRunner.query(`DROP INDEX "IDX_c7daafbc33757e9e86c15730fc"`);
        await queryRunner.query(`DROP INDEX "IDX_aefb52695dd14f10dbebf97ff7"`);
        await queryRunner.query(`DROP TABLE "keyword_questions_question"`);
        await queryRunner.query(`DROP TABLE "keyword"`);
    }

}
