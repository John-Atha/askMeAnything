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
    return this.questionService.findMonthly(reqParams, year, month);
  }
}
