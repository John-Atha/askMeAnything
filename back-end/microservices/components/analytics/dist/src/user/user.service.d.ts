import { EntityManager } from 'typeorm';
export declare class UserService {
    private manager;
    constructor(manager: EntityManager);
    findAllQuestions(params: any, id: number, year: number, month: number): Promise<any>;
    findAllAnswers(params: any, id: number, year: number, month: number): Promise<any>;
    findAllAnsweredQuestions(params: any, id: number, year: number, month: any): Promise<any>;
}
