import { EntityManager } from 'typeorm';
export declare class QuestionService {
    private manager;
    constructor(manager: EntityManager);
    findStatsMonthly(): Promise<any>;
    findStatsDaily(): Promise<any>;
}
