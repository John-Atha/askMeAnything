import { QuestionService } from './question.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
export declare class QuestionController {
    private readonly questionService;
    constructor(questionService: QuestionService);
    create(req: any, createQuestionDto: CreateQuestionDto): Promise<any>;
    findOne(id: number): Promise<any>;
    update(req: any, id: number, updateQuestionDto: UpdateQuestionDto): Promise<any>;
    remove(req: any, id: number): Promise<any>;
    Answers(reqParams: any, id: number): Promise<any>;
    Upvotes(reqParams: any, id: number): Promise<any>;
    Upvoted(req: any, id: number): Promise<any>;
    Keywords(id: number): Promise<any>;
    AttachKeyword(req: any, quest_id: number, key_id: number): Promise<any>;
    DetachKeyword(req: any, quest_id: number, key_id: number): Promise<any>;
}
