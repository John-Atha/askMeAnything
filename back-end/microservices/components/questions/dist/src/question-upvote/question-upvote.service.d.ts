import { CreateQuestionUpvoteDto } from './dto/create-question-upvote.dto';
import { EntityManager } from 'typeorm';
import { User } from '../user/entities/user.entity';
import { Question } from 'src/question/entities/question.entity';
export declare class QuestionUpvoteService {
    private manager;
    constructor(manager: EntityManager);
    create(req: any, createQuestionUpvoteDto: CreateQuestionUpvoteDto): Promise<any>;
    remove(req: any, id: number): Promise<import("typeorm").DeleteResult>;
    validateCreate(owner: User, question: Question): Promise<boolean>;
}
