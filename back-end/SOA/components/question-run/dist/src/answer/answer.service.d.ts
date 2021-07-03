import { CreateAnswerDto } from './dto/create-answer.dto';
import { UpdateAnswerDto } from './dto/update-answer.dto';
export declare class AnswerService {
    constructor();
    create(req: any, createAnswerDto: CreateAnswerDto): Promise<any>;
    update(req: any, id: number, updateAnswerDto: UpdateAnswerDto): Promise<any>;
    remove(req: any, id: number): Promise<any>;
}
