import { CreateQuestionUpvoteDto } from './dto/create-question-upvote.dto';
export declare class QuestionUpvoteService {
    constructor();
    create(req: any, createQuestionUpvoteDto: CreateQuestionUpvoteDto): Promise<any>;
    remove(req: any, id: number): Promise<any>;
}
