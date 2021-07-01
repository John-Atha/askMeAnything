import {
  Controller,
  Get,
  Param,
  Query,
  ParseIntPipe,
  ClassSerializerInterceptor,
  UseInterceptors,
} from '@nestjs/common';
import { QuestionService } from './question.service';

@Controller('questions')
@UseInterceptors(ClassSerializerInterceptor)
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @Get('monthly/:year/:month')
  findMonthly(
    @Query() reqParams,
    @Param('year', ParseIntPipe) year: number,
    @Param('month', ParseIntPipe) month: number,
  ) {
    return this.questionService.findAll(reqParams, year, month-1);
  }

  @Get('yearly/:year')
  findYearly(
    @Query() reqParams,
    @Param('year', ParseIntPipe) year: number,
  ) {
    return this.questionService.findAll(reqParams, year, null);
  }

  @Get()
  findAll(@Query() reqParams) {
    return this.questionService.findAll(reqParams, null, null);
  }

  @Get('/stats/monthly')
  findQuestionsStatsMonthly() {
    return this.questionService.findStatsMonthly();
  }

  @Get('/stats/daily')
  findQuestionsStatsDaily() {
    return this.questionService.findStatsDaily();
  }
}
