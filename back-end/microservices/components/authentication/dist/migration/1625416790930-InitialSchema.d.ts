import { MigrationInterface, QueryRunner } from "typeorm";
export declare class InitialSchema1625416790930 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
