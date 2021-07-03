import { CreateKeywordDto } from './dto/create-keyword.dto';
export declare class KeywordService {
    constructor();
    create(req: any, createKeywordDto: CreateKeywordDto): Promise<any>;
    findAll(params: any): Promise<any>;
    findOne(id: number): Promise<any>;
}
