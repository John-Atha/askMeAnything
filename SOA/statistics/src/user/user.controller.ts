import { Controller, Get, Param, ParseIntPipe, Request } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':id/questions/stats/monthly')
  findUsersQuestionsStatsMonthly(@Param('id', ParseIntPipe) id: number) {
    return this.userService.findQuestionsStatsMonthly(id);
  }

  @Get(':id/questions/stats/daily')
  findUsersQuestionsStatsDaily(@Param('id', ParseIntPipe) id: number) {
    return this.userService.findQuestionsStatsDaily(id);
  }

  @Get(':id/answers/stats/monthly')
  findUsersAnswersStatsMonthly(@Param('id', ParseIntPipe) id: number) {
    return this.userService.findAnswersStatsMonthly(id);
  }

  @Get(':id/answers/stats/daily')
  findUsersAnswersStatsDaily(@Param('id', ParseIntPipe) id: number) {
    return this.userService.findAnswersStatsDaily(id);
  }
}
