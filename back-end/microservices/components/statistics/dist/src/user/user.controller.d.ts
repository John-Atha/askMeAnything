import { UserService } from './user.service';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    findUsersQuestionsStatsMonthly(id: number): Promise<any>;
    findUsersQuestionsStatsDaily(id: number): Promise<any>;
    findUsersAnswersStatsMonthly(id: number): Promise<any>;
    findUsersAnswersStatsDaily(id: number): Promise<any>;
    findUsersRanking(req: any, reqParams: any): Promise<any>;
    findUsersAnsweredStatsMonthly(id: number): Promise<any>;
    findUsersAnsweredStatsDaily(id: number): Promise<any>;
}
