import { QuestionService } from './question.service';
export declare class QuestionController {
    private readonly questionService;
    constructor(questionService: QuestionService);
    findQuestionsStatsMonthly(): Promise<any>;
    findQuestionsStatsDaily(): Promise<any>;
}
