export declare class UserService {
    constructor();
    findAllQuestions(params: any, id: number, year: number, month: number): Promise<any>;
    findAllAnswers(params: any, id: number, year: number, month: number): Promise<any>;
    findAllAnsweredQuestions(params: any, id: number, year: number, month: any): Promise<any>;
    findQuestionsStatsMonthly(id: number): Promise<any>;
    findAnswersStatsMonthly(id: number): Promise<any>;
    findQuestionsStatsDaily(id: number): Promise<any>;
    findAnswersStatsDaily(id: number): Promise<any>;
    ranking(req: any, params: any): Promise<any>;
    findAnsweredStatsMonthly(id: number): Promise<any>;
    findAnsweredStatsDaily(id: number): Promise<any>;
}
