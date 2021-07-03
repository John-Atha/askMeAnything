import { EntityManager } from 'typeorm';
import { QuestionUpvote } from './entities/question-upvote.entity';
export declare class QuestionUpvoteService {
    private manager;
    constructor(manager: EntityManager);
    findOne(params: any): Promise<any>;
    create(createQuestionUpvoteDto: any): Promise<QuestionUpvote>;
    remove(id: number): Promise<import("typeorm").DeleteResult>;
}
