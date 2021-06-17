import {MigrationInterface, QueryRunner} from "typeorm";

export class InitialSchema1623941471250 implements MigrationInterface {
    name = 'InitialSchema1623941471250'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "keyword" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "UQ_c37917986ab4672d78f5e037ec3" UNIQUE ("name"), CONSTRAINT "PK_affdb8c8fa5b442900cb3aa21dc" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "question" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "text" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "ownerId" integer NOT NULL, CONSTRAINT "UQ_83ba3cab2514695c0cdf6b835f5" UNIQUE ("title"), CONSTRAINT "PK_21e5786aa0ea704ae185a79b2d5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "answer" ("id" SERIAL NOT NULL, "text" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "ownerId" integer NOT NULL, "questionId" integer NOT NULL, CONSTRAINT "PK_9232db17b63fb1e94f97e5c224f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "question_keywords_keyword" ("questionId" integer NOT NULL, "keywordId" integer NOT NULL, CONSTRAINT "PK_bbe8e99f8dca625dce1d46bffa7" PRIMARY KEY ("questionId", "keywordId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_9635237a4336f8763bce3d3018" ON "question_keywords_keyword" ("questionId") `);
        await queryRunner.query(`CREATE INDEX "IDX_c69eb1cf4b79eb9d781e7eb8f5" ON "question_keywords_keyword" ("keywordId") `);
        await queryRunner.query(`ALTER TABLE "question" ADD CONSTRAINT "FK_1816eb9cc1340c57fcd0145279f" FOREIGN KEY ("ownerId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "answer" ADD CONSTRAINT "FK_93ec8f9a01499387d1e626db65c" FOREIGN KEY ("ownerId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "answer" ADD CONSTRAINT "FK_a4013f10cd6924793fbd5f0d637" FOREIGN KEY ("questionId") REFERENCES "question"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "question_keywords_keyword" ADD CONSTRAINT "FK_9635237a4336f8763bce3d30181" FOREIGN KEY ("questionId") REFERENCES "question"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "question_keywords_keyword" ADD CONSTRAINT "FK_c69eb1cf4b79eb9d781e7eb8f57" FOREIGN KEY ("keywordId") REFERENCES "keyword"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "question_keywords_keyword" DROP CONSTRAINT "FK_c69eb1cf4b79eb9d781e7eb8f57"`);
        await queryRunner.query(`ALTER TABLE "question_keywords_keyword" DROP CONSTRAINT "FK_9635237a4336f8763bce3d30181"`);
        await queryRunner.query(`ALTER TABLE "answer" DROP CONSTRAINT "FK_a4013f10cd6924793fbd5f0d637"`);
        await queryRunner.query(`ALTER TABLE "answer" DROP CONSTRAINT "FK_93ec8f9a01499387d1e626db65c"`);
        await queryRunner.query(`ALTER TABLE "question" DROP CONSTRAINT "FK_1816eb9cc1340c57fcd0145279f"`);
        await queryRunner.query(`DROP INDEX "IDX_c69eb1cf4b79eb9d781e7eb8f5"`);
        await queryRunner.query(`DROP INDEX "IDX_9635237a4336f8763bce3d3018"`);
        await queryRunner.query(`DROP TABLE "question_keywords_keyword"`);
        await queryRunner.query(`DROP TABLE "answer"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "question"`);
        await queryRunner.query(`DROP TABLE "keyword"`);
    }

}
