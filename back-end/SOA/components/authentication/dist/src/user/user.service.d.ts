import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UserService {
    constructor();
    create(createUserDto: CreateUserDto): Promise<any>;
    findAll(params: any): Promise<any>;
    findOne(id: number): Promise<any>;
    update(id: number, updateUserDto: UpdateUserDto, req: any): Promise<any>;
    remove(id: number, req: any): Promise<any>;
    identify(req: any): {
        username: any;
        id: any;
    };
}
