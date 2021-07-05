import { QuestionUpvoteService } from './question-upvote.service';
import { CreateQuestionUpvoteDto } from './dto/create-question-upvote.dto';
export declare class QuestionUpvoteController {
    private readonly questionUpvoteService;
    constructor(questionUpvoteService: QuestionUpvoteService);
    create(req: any, createQuestionUpvoteDto: CreateQuestionUpvoteDto): Promise<any>;
    remove(req: any, id: number): Promise<import("typeorm").DeleteResult>;
}
