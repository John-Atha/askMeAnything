export declare class KeywordService {
    constructor();
    findQuestionsMonthly(params: any, id: any, year: any, month: any): Promise<any>;
    findAll(params: any, id: number, year: number, month: number): Promise<any>;
    findStatsMonthly(id: number): Promise<any>;
    findStatsDaily(id: number): Promise<any>;
    findStats(): Promise<any>;
}
