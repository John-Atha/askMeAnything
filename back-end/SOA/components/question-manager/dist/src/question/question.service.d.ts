import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
export declare class QuestionService {
    constructor();
    create(req: any, createQuestionDto: CreateQuestionDto): Promise<any>;
    findOne(id: number): Promise<any>;
    update(req: any, id: number, updateQuestionDto: UpdateQuestionDto): Promise<any>;
    remove(req: any, id: number): Promise<any>;
    findQuestionsAnswers(id: number, paramsInit: any): Promise<any>;
    withCountAnswersUpvotes(answers: any): Promise<any>;
    findUpvotes(id: number, paramsInit: any): Promise<any>;
    findKeywords(id: number): Promise<any>;
    attachKeyword(req: any, question_id: number, keyword_id: number): Promise<any>;
    detachKeyword(req: any, question_id: number, keyword_id: number): Promise<any>;
    isUpvoted(req: any, id: number): Promise<any>;
}
