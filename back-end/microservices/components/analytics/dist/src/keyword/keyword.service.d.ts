import { EntityManager } from 'typeorm';
export declare class KeywordService {
    private manager;
    constructor(manager: EntityManager);
    findQuestionsMonthly(params: any, id: any, year: any, month: any): Promise<any>;
    findAll(params: any, id: number, year: number, month: number): Promise<any>;
}
