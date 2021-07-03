import { AnswerService } from './answer.service';
export declare class AnswerController {
    private readonly answerService;
    constructor(answerService: AnswerService);
    findOne(id: number): Promise<any>;
    findOneUpvotes(reqParams: any, id: number): Promise<any>;
    IsUpvoted(req: any, id: number): Promise<any>;
}
