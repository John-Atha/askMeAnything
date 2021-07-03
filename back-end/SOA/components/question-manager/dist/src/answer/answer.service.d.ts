export declare class AnswerService {
    constructor();
    findOneUpvotes(id: number, params: any): Promise<any>;
    isUpvoted(id: number, req: any): Promise<any>;
    findOne(id: number): Promise<any>;
}
