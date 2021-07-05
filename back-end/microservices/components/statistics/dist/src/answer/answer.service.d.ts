import { EntityManager } from 'typeorm';
export declare class AnswerService {
    private manager;
    constructor(manager: EntityManager);
    findStatsMonthly(): Promise<any>;
    findStatsDaily(): Promise<any>;
}
