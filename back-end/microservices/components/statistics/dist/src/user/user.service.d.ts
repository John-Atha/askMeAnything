import { EntityManager } from 'typeorm';
export declare class UserService {
    private manager;
    constructor(manager: EntityManager);
    findQuestionsStatsMonthly(id: number): Promise<any>;
    findAnswersStatsMonthly(id: number): Promise<any>;
    findQuestionsStatsDaily(id: number): Promise<any>;
    findAnswersStatsDaily(id: number): Promise<any>;
    ranking(req: any, params: any): Promise<any>;
    findAnsweredStatsMonthly(id: number): Promise<any>;
    findAnsweredStatsDaily(id: number): Promise<any>;
}
