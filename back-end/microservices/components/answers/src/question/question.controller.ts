import {
  Controller,
  Get,
  Param,
  Query,
  ParseIntPipe
} from '@nestjs/common';
import { QuestionService } from './question.service';

@Controller('questions')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @Get(':id/answers')
  Answers(@Query() reqParams, @Param('id', ParseIntPipe) id: number) {
    return this.questionService.findQuestionsAnswers(id, reqParams);
  }
}
