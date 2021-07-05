import { CreateAnswerUpvoteDto } from './dto/create-answer-upvote.dto';
import { EntityManager } from 'typeorm';
import { User } from '../user/entities/user.entity';
import { Answer } from 'src/answer/entities/answer.entity';
export declare class AnswerUpvoteService {
    private manager;
    constructor(manager: EntityManager);
    create(req: any, createAnswerUpvoteDto: CreateAnswerUpvoteDto): Promise<any>;
    remove(req: any, id: number): Promise<any>;
    validateCreate(user: User, answer: Answer): Promise<boolean>;
}
