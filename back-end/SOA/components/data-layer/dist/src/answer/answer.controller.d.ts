import { AnswerService } from './answer.service';
import { UpdateAnswerDto } from './dto/update-answer.dto';
export declare class AnswerController {
    private readonly answerService;
    constructor(answerService: AnswerService);
    findOne(reqParams: any): Promise<import("./entities/answer.entity").Answer>;
    find(reqParams: any): Promise<import("./entities/answer.entity").Answer[]>;
    countUpvotes(body: any): Promise<import("./entities/answer.entity").Answer[]>;
    countUpvotesAnswersOnly(body: any): Promise<import("./entities/answer.entity").Answer[]>;
    findOneUpvotes(id: number): Promise<import("../answer-upvote/entities/answer-upvote.entity").AnswerUpvote[]>;
    IsUpvoted(answer_id: number, user_id: number): Promise<any>;
    create(body: any): Promise<import("./entities/answer.entity").Answer>;
    update(id: number, updateAnswerDto: UpdateAnswerDto): Promise<import("./entities/answer.entity").Answer>;
    remove(id: number): Promise<any>;
    findAnswersStatsMonthly(): Promise<any>;
    findAnswersStatsDaily(id: string): Promise<any>;
}
