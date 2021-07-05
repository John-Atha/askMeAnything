import { QuestionService } from './question.service';
export declare class QuestionController {
    private readonly questionService;
    constructor(questionService: QuestionService);
    Answers(reqParams: any, id: number): Promise<any>;
}
