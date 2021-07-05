import { CreateAnswerDto } from './dto/create-answer.dto';
import { UpdateAnswerDto } from './dto/update-answer.dto';
import { EntityManager } from 'typeorm';
export declare class AnswerService {
    private manager;
    constructor(manager: EntityManager);
    create(req: any, createAnswerDto: CreateAnswerDto): Promise<any>;
    update(req: any, id: number, updateAnswerDto: UpdateAnswerDto): Promise<any>;
    remove(req: any, id: number): Promise<any>;
    findOne(id: number): Promise<any>;
    findOneUpvotes(id: number, params: any): Promise<any>;
    countOneUpvotes(id: number): Promise<any>;
    isUpvoted(id: number, req: any): Promise<any>;
}
