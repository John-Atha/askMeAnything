import { AnswerService } from './answer.service';
export declare class AnswerController {
    private readonly answerService;
    constructor(answerService: AnswerService);
    findMonthly(reqParams: any, year: number, month: number): Promise<any>;
    findYearly(reqParams: any, year: number): Promise<any>;
    findAll(reqParams: any): Promise<any>;
    findAnswersStatsMonthly(): Promise<any>;
    findAnswersStatsDaily(id: string): Promise<any>;
}
