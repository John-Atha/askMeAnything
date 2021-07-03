import { QuestionService } from './question.service';
export declare class QuestionController {
    private readonly questionService;
    constructor(questionService: QuestionService);
    findMonthly(reqParams: any, year: number, month: number): Promise<any>;
    findYearly(reqParams: any, year: number): Promise<any>;
    findAll(reqParams: any): Promise<any>;
    findQuestionsStatsMonthly(): Promise<any>;
    findQuestionsStatsDaily(): Promise<any>;
}
