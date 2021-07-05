import { AnswerService } from './answer.service';
export declare class AnswerController {
    private readonly answerService;
    constructor(answerService: AnswerService);
    findAnswersStatsMonthly(): Promise<any>;
    findAnswersStatsDaily(id: string): Promise<any>;
}
