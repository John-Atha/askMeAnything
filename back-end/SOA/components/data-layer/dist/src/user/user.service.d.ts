import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { EntityManager } from 'typeorm';
export declare class UserService {
    private manager;
    constructor(manager: EntityManager);
    create(createUserDto: CreateUserDto): Promise<User>;
    findAll(): Promise<User[]>;
    findOne(conditions: any): Promise<User>;
    findOneWithPass(conditions: any): Promise<User>;
    update(id: number, updateUserDto: UpdateUserDto): Promise<User>;
    remove(id: number): Promise<any>;
    findAnswered(id: number, params: any): Promise<any>;
    findQuestionsStatsMonthly(id: number): Promise<any>;
    findAnswersStatsMonthly(id: number): Promise<any>;
    findQuestionsStatsDaily(id: number): Promise<any>;
    findAnswersStatsDaily(id: number): Promise<any>;
    ranking(): Promise<User[]>;
    findAnsweredStatsMonthly(id: number): Promise<any>;
    findAnsweredStatsDaily(id: number): Promise<any>;
}
