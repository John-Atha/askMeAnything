import { Controller, Get, Param, ParseIntPipe, Request } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':id/questions/stats/monthly')
  findUsersQuestionsStatsMonthly(@Param('id', ParseIntPipe) id: number) {
    return this.userService.findQuestionsStatsMonthly(id);
  }

  @Get(':id/answers/stats/monthly')
  findUsersAnswersStatsMonthly(@Param('id', ParseIntPipe) id: number) {
    return this.userService.findAnswersStatsMonthly(id);
  }
}
