import { ChoreoObjectDto } from 'src/choreoObject.dto';
import { EntityManager } from 'typeorm';
export declare const validateParams: (params: any) => void;
export declare const paginate: (res: any, params: any) => any;
export declare function verify(req: any): Promise<any>;
export declare function addNestedOwnerToObj(obj: any, user_id: number): Promise<any>;
export declare function addNestedQuestionToObj(obj: any, question_id: number): Promise<any>;
export declare const getToken: (req: any) => string;
export declare function handleChoreoMessage(body: ChoreoObjectDto, manager: EntityManager, pool: any, fresh: boolean): Promise<any>;
