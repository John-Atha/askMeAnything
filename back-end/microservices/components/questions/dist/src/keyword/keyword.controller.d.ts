import { KeywordService } from './keyword.service';
import { CreateKeywordDto } from './dto/create-keyword.dto';
export declare class KeywordController {
    private readonly keywordService;
    constructor(keywordService: KeywordService);
    create(req: any, createKeywordDto: CreateKeywordDto): Promise<any>;
    findAll(reqParams: any): Promise<any>;
    findOne(id: number): Promise<any>;
}
