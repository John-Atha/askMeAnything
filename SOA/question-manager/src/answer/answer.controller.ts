import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { AnswerService } from './answer.service';

@Controller('answers')
@UseInterceptors(ClassSerializerInterceptor)
export class AnswerController {
  constructor(private readonly answerService: AnswerService) {}

  @Get(':id/upvotes')
  findOneUpvotes(@Query() reqParams, @Param('id', ParseIntPipe) id: number) {
    return this.answerService.findOneUpvotes(id, reqParams);
  }
}
