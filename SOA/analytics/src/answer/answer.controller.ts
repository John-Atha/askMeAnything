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
  findMonthly(@Query() reqParams, @Param ('year', ParseIntPipe) year: number, @Param ('month', ParseIntPipe) month: number) {
    return this.answerService.findMonthly(reqParams, year, month);
  }
}
