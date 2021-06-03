import {
  Controller,
  Post,
  Body,
  Param,
  Delete,
  Request,
  ParseIntPipe,
  ClassSerializerInterceptor,
  UseInterceptors,
} from '@nestjs/common';
import { AnswerUpvoteService } from './answer-upvote.service';
import { CreateAnswerUpvoteDto } from './dto/create-answer-upvote.dto';

@Controller('answer-upvotes')
@UseInterceptors(ClassSerializerInterceptor)
export class AnswerUpvoteController {
  constructor(private readonly answerUpvoteService: AnswerUpvoteService) {}

  @Post()
  create(@Request() req, @Body() createAnswerUpvoteDto: CreateAnswerUpvoteDto) {
    return this.answerUpvoteService.create(req, createAnswerUpvoteDto);
  }

  @Delete(':id')
  remove(@Request() req, @Param('id', ParseIntPipe) id: number) {
    return this.answerUpvoteService.remove(req, id);
  }
}
