import { Controller, Get } from '@nestjs/common';
import { QuestionService } from './question.service';

@Controller('questions')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @Get('/stats/monthly')
  findQuestionsStatsMonthly() {
    return this.questionService.findStatsMonthly();
  }

  @Get('/stats/daily')
  findQuestionsStatsDaily() {
    return this.questionService.findStatsDaily();
  }
}
