import { CreateAnswerUpvoteDto } from './dto/create-answer-upvote.dto';
export declare class AnswerUpvoteService {
    constructor();
    create(req: any, createAnswerUpvoteDto: CreateAnswerUpvoteDto): Promise<any>;
    remove(req: any, id: number): Promise<any>;
}
