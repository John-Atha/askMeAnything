import { CreateKeywordDto } from './dto/create-keyword.dto';
import { EntityManager } from 'typeorm';
export declare class KeywordService {
    private manager;
    constructor(manager: EntityManager);
    create(req: any, createKeywordDto: CreateKeywordDto): Promise<any>;
    findAll(params: any): Promise<any>;
    findOne(id: number): Promise<any>;
    validateCreate(name: string): Promise<boolean>;
}
