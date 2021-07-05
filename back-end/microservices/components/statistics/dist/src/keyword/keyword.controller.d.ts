import { KeywordService } from './keyword.service';
export declare class KeywordController {
    private readonly keywordService;
    constructor(keywordService: KeywordService);
    findKeywordsStatsMonthly(id: number): Promise<any>;
    findKeywordsStatsDaily(id: number): Promise<any>;
    findKeywordsStats(): Promise<any>;
}
