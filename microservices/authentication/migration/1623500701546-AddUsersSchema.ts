import {MigrationInterface, QueryRunner} from "typeorm";

export class AddUsersSchema1623500701546 implements MigrationInterface {
    name = 'AddUsersSchema1623500701546'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "email" character varying NOT NULL, "username" character varying NOT NULL, "password" character varying NOT NULL, "date_of_birth" TIMESTAMP, "points" integer NOT NULL DEFAULT '0', "bio" character varying, "site_url" character varying, "github_username" character varying, "first_name" character varying, "last_name" character varying, "member_since" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
