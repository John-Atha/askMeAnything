import { EntityManager } from 'typeorm';
export declare class QuestionService {
    private manager;
    constructor(manager: EntityManager);
    findAll(params: any, year: number, month: number): Promise<any>;
}
