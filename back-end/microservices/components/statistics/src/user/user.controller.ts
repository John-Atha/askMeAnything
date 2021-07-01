import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  Request,
  ParseIntPipe,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';

@Controller('users')
@UseInterceptors(ClassSerializerInterceptor)
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

  @Get('ranking')
  findUsersRanking(@Request() req, @Query() reqParams) {
    return this.userService.ranking(req, reqParams);
  }

  @Get(':id/answered/stats/monthly')
  findUsersAnsweredStatsMonthly(@Param ('id', ParseIntPipe) id: number) {
    return this.userService.findAnsweredStatsMonthly(id);
  }

  @Get(':id/answered/stats/daily')
  findUsersAnsweredStatsDaily(@Param ('id', ParseIntPipe) id: number) {
    return this.userService.findAnsweredStatsDaily(id);
  }
}
