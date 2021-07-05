import { ChoreoObjectDto } from './choreoObject.dto';
import { EntityManager } from 'typeorm';
export declare class AppService {
    private manager;
    constructor(manager: EntityManager);
    myAddress: any;
    pool: any;
    getHello(): string;
    choreoHandle(body: ChoreoObjectDto, fresh: boolean): Promise<any>;
    lastMessagesCheck(): Promise<any>;
}
