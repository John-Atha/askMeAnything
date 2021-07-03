import { QuestionUpvoteService } from './question-upvote.service';
export declare class QuestionUpvoteController {
    private readonly questionUpvoteService;
    constructor(questionUpvoteService: QuestionUpvoteService);
    create(createQuestionUpvoteDto: any): Promise<import("./entities/question-upvote.entity").QuestionUpvote>;
    remove(req: any, id: number): Promise<import("typeorm").DeleteResult>;
    findOne(reqParams: any): Promise<any>;
}
