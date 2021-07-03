import { EntityManager } from 'typeorm';
import { AnswerUpvote } from './entities/answer-upvote.entity';
export declare class AnswerUpvoteService {
    private manager;
    constructor(manager: EntityManager);
    findOne(params: any): Promise<AnswerUpvote>;
    create(createAnswerUpvoteDto: any): Promise<AnswerUpvote>;
    remove(id: number): Promise<any>;
}
