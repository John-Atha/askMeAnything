import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  Query,
  ParseIntPipe,
  UseInterceptors,
} from '@nestjs/common';
import { AnswerService } from './answer.service';

@Controller('answers')
@UseInterceptors(ClassSerializerInterceptor)
export class AnswerController {
  constructor(private readonly answerService: AnswerService) {}

  @Get('monthly/:year/:month')
  findMonthly(
    @Query() reqParams,
    @Param('year', ParseIntPipe) year: number,
    @Param('month', ParseIntPipe) month: number
  ) {
    return this.answerService.findAll(reqParams, year, month-1);
  }

  @Get('yearly/:year')
  findYearly(
    @Query() reqParams,
    @Param('year', ParseIntPipe) year: number,
  ) {
    return this.answerService.findAll(reqParams, year, null);
  }

  @Get()
  findAll(@Query() reqParams) {
    return this.answerService.findAll(reqParams, null, null);
  }

  @Get('stats/monthly')
  findAnswersStatsMonthly() {
    return this.answerService.findStatsMonthly();
  }

  @Get('stats/daily')
  findAnswersStatsDaily(@Param('id') id: string) {
    return this.answerService.findStatsDaily();
  }
}