import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    create(createUserDto: CreateUserDto): Promise<import("./entities/user.entity").User>;
    findAll(): Promise<import("./entities/user.entity").User[]>;
    findOne(conditions: any): Promise<import("./entities/user.entity").User>;
    findOneWithPass(conditions: any): Promise<import("./entities/user.entity").User>;
    update(id: number, updateUserDto: UpdateUserDto): Promise<import("./entities/user.entity").User>;
    remove(id: number): Promise<any>;
    findAnswered(id: number, reqParams: any): Promise<any>;
    findUsersQuestionsStatsMonthly(id: number): Promise<any>;
    findUsersAnswersStatsMonthly(id: number): Promise<any>;
    findUsersQuestionsStatsDaily(id: number): Promise<any>;
    findUsersAnswersStatsDaily(id: number): Promise<any>;
    findUsersRanking(req: any, reqParams: any): Promise<import("./entities/user.entity").User[]>;
    findUsersAnsweredStatsMonthly(id: number): Promise<any>;
    findUsersAnsweredStatsDaily(id: number): Promise<any>;
}
