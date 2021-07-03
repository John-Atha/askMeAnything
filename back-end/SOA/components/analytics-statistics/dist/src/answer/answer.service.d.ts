export declare class AnswerService {
    findMonthly(params: any, year: number, month: number): Promise<any>;
    findAll(params: any, year: number, month: number): Promise<any>;
    findStatsMonthly(): Promise<any>;
    findStatsDaily(): Promise<any>;
}
