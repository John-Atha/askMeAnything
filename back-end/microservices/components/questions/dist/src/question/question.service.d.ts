import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { EntityManager } from 'typeorm';
import { QuestionUpvote } from '../question-upvote/entities/question-upvote.entity';
export declare class QuestionService {
    private manager;
    constructor(manager: EntityManager);
    create(req: any, createQuestionDto: CreateQuestionDto): Promise<any>;
    findOne(id: number): Promise<any>;
    countUpvotes(id: number): Promise<any>;
    update(req: any, id: number, updateQuestionDto: UpdateQuestionDto): Promise<any>;
    remove(req: any, id: number): Promise<any>;
    findUpvotes(id: number, reqParams: any): Promise<QuestionUpvote[]>;
    isUpvoted(req: any, id: number): Promise<any>;
    findKeywords(id: number): Promise<any>;
    attachKeyword(req: any, question_id: number, keyword_id: number): Promise<any>;
    detachKeyword(req: any, question_id: number, keyword_id: number): Promise<any>;
    validateCreate(title: string): Promise<boolean>;
    validateUpdate(id: number, title: string): Promise<boolean>;
}
