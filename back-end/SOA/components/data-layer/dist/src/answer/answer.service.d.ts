import { UpdateAnswerDto } from './dto/update-answer.dto';
import { EntityManager } from 'typeorm';
import { Answer } from './entities/answer.entity';
import { AnswerUpvote } from '../answer-upvote/entities/answer-upvote.entity';
export declare class AnswerService {
    private manager;
    constructor(manager: EntityManager);
    findOne(params: any): Promise<Answer>;
    find(params: any): Promise<Answer[]>;
    findOneUpvotes(id: number): Promise<AnswerUpvote[]>;
    isUpvoted(answer_id: number, user_id: number): Promise<any>;
    create(body: any): Promise<Answer>;
    update(id: number, updateAnswerDto: UpdateAnswerDto): Promise<Answer>;
    remove(id: number): Promise<any>;
    answersAndQuestionsCountUpvotes(body: any): Promise<Answer[]>;
    answersCountUpvotes(body: any): Promise<Answer[]>;
    findStatsMonthly(): Promise<any>;
    findStatsDaily(): Promise<any>;
}
