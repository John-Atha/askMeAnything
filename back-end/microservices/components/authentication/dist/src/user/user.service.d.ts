import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { EntityManager } from 'typeorm';
export declare class UserService {
    private manager;
    constructor(manager: EntityManager);
    create(createUserDto: CreateUserDto): Promise<any>;
    findAll(params: any): Promise<any>;
    findOne(id: number): Promise<any>;
    update(id: number, updateUserDto: UpdateUserDto, req: any): Promise<any>;
    pointsUpd(req: any, id: number, how: string): Promise<any>;
    remove(id: number, req: any): Promise<any>;
    validRegister(username: string, email: string): Promise<boolean>;
    validUpdate(id: number, username: string, email: string): Promise<boolean>;
    identify(req: any): {
        username: any;
        id: any;
    };
    ranking(req: any, params: any): Promise<any>;
}
