import { MigrationInterface, QueryRunner } from "typeorm";
export declare class InitialSchema1625416883779 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
