import { ChoreoObjectDto } from 'src/choreoObject.dto';
import { EntityManager } from 'typeorm';
export declare const validateParams: (params: any) => void;
export declare const paginate: (res: any, params: any) => any;
export declare function verify(req: any): Promise<any>;
export declare const daysComplete: (data: any, key: any) => any;
export declare const monthlyCountsParseInt: (data: any, key: any) => any;
export declare function handleChoreoMessage(body: ChoreoObjectDto, manager: EntityManager, pool: any, fresh: boolean): Promise<any>;
