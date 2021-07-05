import { AnswerService } from './answer.service';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { UpdateAnswerDto } from './dto/update-answer.dto';
export declare class AnswerController {
    private readonly answerService;
    constructor(answerService: AnswerService);
    findOne(id: number): Promise<any>;
    findOneUpvotes(reqParams: any, id: number): Promise<any>;
    CountOneUpvotes(id: number): Promise<any>;
    IsUpvoted(req: any, id: number): Promise<any>;
    create(req: any, createAnswerDto: CreateAnswerDto): Promise<any>;
    update(req: any, id: number, updateAnswerDto: UpdateAnswerDto): Promise<any>;
    remove(req: any, id: number): Promise<any>;
}
