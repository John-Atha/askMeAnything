import {
  Controller,
  Get,
  Param,
  ClassSerializerInterceptor,
  Query,
  UseInterceptors,
  ParseIntPipe,
  Request,
} from '@nestjs/common';
import { UserService } from './user.service';

@Controller('users')
@UseInterceptors(ClassSerializerInterceptor)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':id/questions/monthly/:year/:month')
  findUsersQuestionsMonthly(
    @Query() reqParams,
    @Param('id', ParseIntPipe) id: number,
    @Param('year', ParseIntPipe) year:number,
    @Param('month', ParseIntPipe) month: number,
  ) {
    return this.userService.findAllQuestions(reqParams, id, year, month-1);
  }

  @Get(':id/questions/yearly/:year')
  findUsersQuestionsYearly(
    @Query() reqParams,
    @Param('id', ParseIntPipe) id: number,
    @Param('year', ParseIntPipe) year:number,
  ) {
    return this.userService.findAllQuestions(reqParams, id, year, null);
  }

  @Get(':id/questions')
  findUsersQuestions(
    @Query() reqParams,
    @Param('id', ParseIntPipe) id: number
  ) {
    return this.userService.findAllQuestions(reqParams, id, null, null);
  }

  @Get(':id/answers/monthly/:year/:month')
  findUsersAnswersMonthly(
    @Query() reqParams,
    @Param('id', ParseIntPipe) id: number,
    @Param('year', ParseIntPipe) year: number,
    @Param('month', ParseIntPipe) month: number,
  ) {
    return this.userService.findAllAnswers(reqParams, id, year, month-1);
  }

  @Get(':id/answers/yearly/:year/')
  findUsersAnswersYearly(
    @Query() reqParams,
    @Param('id', ParseIntPipe) id: number,
    @Param('year', ParseIntPipe) year: number,
  ) {
    return this.userService.findAllAnswers(reqParams, id, year, null);
  }

  @Get(':id/answers')
  findUsersAnswers(
    @Query() reqParams,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.userService.findAllAnswers(reqParams, id, null, null);
  }

  @Get(':id/answered/monthly/:year/:month')
  findUsersAnsweredMonthly(
    @Query() reqParams,
    @Param('id', ParseIntPipe) id: number,
    @Param('year', ParseIntPipe) year: number,
    @Param('month', ParseIntPipe) month: number,
  ) {
    return this.userService.findAllAnsweredQuestions(reqParams, id, year, month);
  }

  @Get(':id/answered/yearly/:year')
  findUsersAnsweredYearly(
    @Query() reqParams,
    @Param('id', ParseIntPipe) id: number,
    @Param('year', ParseIntPipe) year: number,
  ) {
    return this.userService.findAllAnsweredQuestions(reqParams, id, year, null);
  }

  @Get(':id/answered')
  findUsersAnswered(@Query() reqParams, @Param('id', ParseIntPipe) id: number) {
    return this.userService.findAllAnsweredQuestions(reqParams, id, null, null);
  }

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
