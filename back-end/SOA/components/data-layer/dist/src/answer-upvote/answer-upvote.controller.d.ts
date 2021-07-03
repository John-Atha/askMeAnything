import { AnswerUpvoteService } from './answer-upvote.service';
export declare class AnswerUpvoteController {
    private readonly answerUpvoteService;
    constructor(answerUpvoteService: AnswerUpvoteService);
    create(createAnswerUpvoteDto: any): Promise<import("./entities/answer-upvote.entity").AnswerUpvote>;
    remove(id: number): Promise<any>;
    findOne(reqParams: any): Promise<import("./entities/answer-upvote.entity").AnswerUpvote>;
}
