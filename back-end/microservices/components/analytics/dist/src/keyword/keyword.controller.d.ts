import { KeywordService } from './keyword.service';
export declare class KeywordController {
    private readonly keywordService;
    constructor(keywordService: KeywordService);
    findKeywordQuestionsMonthly(reqParams: any, id: number, year: number, month: number): Promise<any>;
    findKeywordQuestionsYearly(reqParams: any, id: number, year: number): Promise<any>;
    findKeywordQuestionsAll(reqParams: any, id: number): Promise<any>;
}
