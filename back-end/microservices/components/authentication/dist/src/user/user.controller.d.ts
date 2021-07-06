import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    create(createUserDto: CreateUserDto): Promise<any>;
    findAll(reqParam: any): Promise<any>;
    findOne(id: number): Promise<any>;
    update(req: any, id: number, updateUserDto: UpdateUserDto): Promise<any>;
    pointsIncr(req: any, id: number): Promise<any>;
    pointsDecr(req: any, id: number): Promise<any>;
    remove(req: any, id: number): Promise<any>;
    identify(req: any): {
        username: any;
        id: any;
    };
    findUsersRanking(req: any, reqParams: any): Promise<any>;
}
