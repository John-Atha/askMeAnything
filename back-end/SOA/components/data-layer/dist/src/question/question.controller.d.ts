import { QuestionService } from './question.service';
import { UpdateQuestionDto } from './dto/update-question.dto';
export declare class QuestionController {
    private readonly questionService;
    constructor(questionService: QuestionService);
    create(body: any): Promise<import("./entities/question.entity").Question>;
    findOne(reqParams: any): Promise<any>;
    find(reqParams: any): Promise<import("./entities/question.entity").Question[]>;
    countUpvotes(body: any): Promise<any>;
    update(id: number, updateQuestionDto: UpdateQuestionDto): Promise<import("./entities/question.entity").Question>;
    remove(id: number): Promise<any>;
    AnswerCountUpvotes(id: number): Promise<any>;
    Upvotes(id: number): Promise<import("../question-upvote/entities/question-upvote.entity").QuestionUpvote[]>;
    Upvoted(user_id: number, quest_id: number): Promise<any>;
    Keywords(id: number): Promise<import("../keyword/entities/keyword.entity").Keyword[]>;
    AttachKeyword(quest_id: number, keyword_id: number): Promise<import("./entities/question.entity").Question>;
    DeAttachKeyword(quest_id: number, keyword_id: number): Promise<import("./entities/question.entity").Question>;
    findQuestionsStatsMonthly(): Promise<any>;
    findQuestionsStatsDaily(): Promise<any>;
}
