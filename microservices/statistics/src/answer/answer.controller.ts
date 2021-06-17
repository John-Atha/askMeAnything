import { Controller, Get, Param } from '@nestjs/common';
import { AnswerService } from './answer.service';

@Controller('answers')
export class AnswerController {
  constructor(private readonly answerService: AnswerService) {}

  @Get('stats/monthly')
  findAnswersStatsMonthly() {
    return this.answerService.findStatsMonthly();
  }

  @Get('stats/daily')
  findAnswersStatsDaily(@Param('id') id: string) {
    return this.answerService.findStatsDaily();
  }
}
