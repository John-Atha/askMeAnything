import {MigrationInterface, QueryRunner} from "typeorm";

export class AddKeywordsToQuestions1619630085241 implements MigrationInterface {
    name = 'AddKeywordsToQuestions1619630085241'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "question_keywords_keyword" ("questionId" integer NOT NULL, "keywordId" integer NOT NULL, CONSTRAINT "PK_bbe8e99f8dca625dce1d46bffa7" PRIMARY KEY ("questionId", "keywordId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_9635237a4336f8763bce3d3018" ON "question_keywords_keyword" ("questionId") `);
        await queryRunner.query(`CREATE INDEX "IDX_c69eb1cf4b79eb9d781e7eb8f5" ON "question_keywords_keyword" ("keywordId") `);
        await queryRunner.query(`ALTER TABLE "question_keywords_keyword" ADD CONSTRAINT "FK_9635237a4336f8763bce3d30181" FOREIGN KEY ("questionId") REFERENCES "question"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "question_keywords_keyword" ADD CONSTRAINT "FK_c69eb1cf4b79eb9d781e7eb8f57" FOREIGN KEY ("keywordId") REFERENCES "keyword"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "question_keywords_keyword" DROP CONSTRAINT "FK_c69eb1cf4b79eb9d781e7eb8f57"`);
        await queryRunner.query(`ALTER TABLE "question_keywords_keyword" DROP CONSTRAINT "FK_9635237a4336f8763bce3d30181"`);
        await queryRunner.query(`DROP INDEX "IDX_c69eb1cf4b79eb9d781e7eb8f5"`);
        await queryRunner.query(`DROP INDEX "IDX_9635237a4336f8763bce3d3018"`);
        await queryRunner.query(`DROP TABLE "question_keywords_keyword"`);
    }

}
