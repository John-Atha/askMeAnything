import { EntityManager } from 'typeorm';
export declare class KeywordService {
    private manager;
    constructor(manager: EntityManager);
    findStatsMonthly(id: number): Promise<any>;
    findStatsDaily(id: number): Promise<any>;
    findStats(): Promise<any>;
}
