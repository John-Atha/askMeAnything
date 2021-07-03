import { KeywordService } from './keyword.service';
import { CreateKeywordDto } from './dto/create-keyword.dto';
export declare class KeywordController {
    private readonly keywordService;
    constructor(keywordService: KeywordService);
    create(createKeywordDto: CreateKeywordDto): Promise<import("./entities/keyword.entity").Keyword>;
    findAll(): Promise<import("./entities/keyword.entity").Keyword[]>;
    findOne(reqParams: any): Promise<any>;
    findKeywordsStatsMonthly(id: number): Promise<any>;
    findKeywordsStatsDaily(id: number): Promise<any>;
    findKeywordsStats(): Promise<any>;
}
