import { UserService } from './user.service';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    findUsersQuestionsMonthly(reqParams: any, id: number, year: number, month: number): Promise<any>;
    findUsersQuestionsYearly(reqParams: any, id: number, year: number): Promise<any>;
    findUsersQuestions(reqParams: any, id: number): Promise<any>;
    findUsersAnswersMonthly(reqParams: any, id: number, year: number, month: number): Promise<any>;
    findUsersAnswersYearly(reqParams: any, id: number, year: number): Promise<any>;
    findUsersAnswers(reqParams: any, id: number): Promise<any>;
    findUsersAnsweredMonthly(reqParams: any, id: number, year: number, month: number): Promise<any>;
    findUsersAnsweredYearly(reqParams: any, id: number, year: number): Promise<any>;
    findUsersAnswered(reqParams: any, id: number): Promise<any>;
}
