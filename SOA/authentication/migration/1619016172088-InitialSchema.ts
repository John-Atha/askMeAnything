import {MigrationInterface, QueryRunner} from "typeorm";

export class InitialSchema1619016172088 implements MigrationInterface {
    name = 'InitialSchema1619016172088'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "date_of_birth" TIMESTAMP NOT NULL, "points" integer NOT NULL DEFAULT '0', "bio" character varying NOT NULL, "site_url" character varying NOT NULL, "github_username" character varying NOT NULL, "first_name" character varying NOT NULL, "last_name" character varying NOT NULL, "member_since" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
