import { ChoreoObjectDto } from './choreoObject.dto';
export declare class AppService {
    constructor();
    myAddress: string;
    pool: any;
    getHello(): string;
    choreoHandle(body: ChoreoObjectDto, fresh: boolean): Promise<any>;
    lastMessagesCheck(): Promise<any>;
}
