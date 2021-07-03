export declare class QuestionService {
    constructor();
    findAll(params: any, year: number, month: number): Promise<any>;
    findStatsMonthly(): Promise<any>;
    findStatsDaily(): Promise<any>;
}
