import { AnswerUpvoteService } from './answer-upvote.service';
import { CreateAnswerUpvoteDto } from './dto/create-answer-upvote.dto';
export declare class AnswerUpvoteController {
    private readonly answerUpvoteService;
    constructor(answerUpvoteService: AnswerUpvoteService);
    create(req: any, createAnswerUpvoteDto: CreateAnswerUpvoteDto): Promise<any>;
    remove(req: any, id: number): Promise<any>;
}
