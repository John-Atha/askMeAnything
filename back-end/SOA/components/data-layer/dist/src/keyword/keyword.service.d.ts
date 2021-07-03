import { CreateKeywordDto } from './dto/create-keyword.dto';
import { Keyword } from './entities/keyword.entity';
import { EntityManager } from 'typeorm';
export declare class KeywordService {
    private manager;
    constructor(manager: EntityManager);
    create(createKeywordDto: CreateKeywordDto): Promise<Keyword>;
    findAll(): Promise<Keyword[]>;
    findOne(params: any): Promise<any>;
    validateCreate(name: string): Promise<boolean>;
    findStatsMonthly(id: number): Promise<any>;
    findStatsDaily(id: number): Promise<any>;
    findStats(): Promise<any>;
}
