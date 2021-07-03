import { UpdateQuestionDto } from './dto/update-question.dto';
import { Question } from './entities/question.entity';
import { EntityManager } from 'typeorm';
import { QuestionUpvote } from '../question-upvote/entities/question-upvote.entity';
import { Keyword } from '../keyword/entities/keyword.entity';
export declare class QuestionService {
    private manager;
    constructor(manager: EntityManager);
    create(body: any): Promise<Question>;
    findOne(params: any): Promise<any>;
    find(params: any): Promise<Question[]>;
    update(id: number, updateQuestionDto: UpdateQuestionDto): Promise<Question>;
    remove(id: number): Promise<any>;
    AnswerCountUpvotes(id: number): Promise<any>;
    findUpvotes(id: number): Promise<QuestionUpvote[]>;
    findKeywords(id: number): Promise<Keyword[]>;
    updKeywords(question_id: number, keyword_id: number, action: string): Promise<Question>;
    isUpvoted(user_id: number, quest_id: number): Promise<any>;
    questionsCountUpvotes(body: any): Promise<any>;
    validateCreate(title: string): Promise<boolean>;
    validateUpdate(id: number, title: string): Promise<boolean>;
    findStatsMonthly(): Promise<any>;
    findStatsDaily(): Promise<any>;
}
