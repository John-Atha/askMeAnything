import { EntityManager } from 'typeorm';
export declare class QuestionService {
    private manager;
    constructor(manager: EntityManager);
    findQuestionsAnswers(id: number, paramsInit: any): Promise<any>;
    withCountAnswersUpvotes(answers: any): Promise<any>;
    addNestedOwners(answers: any): Promise<any>;
}
