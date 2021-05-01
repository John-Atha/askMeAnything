import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AnswerUpvoteService } from './answer-upvote.service';
import { CreateAnswerUpvoteDto } from './dto/create-answer-upvote.dto';

@Controller('answer-upvote')
export class AnswerUpvoteController {
  constructor(private readonly answerUpvoteService: AnswerUpvoteService) {}

  @Post()
  create(@Body() createAnswerUpvoteDto: CreateAnswerUpvoteDto) {
    return this.answerUpvoteService.create(createAnswerUpvoteDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.answerUpvoteService.remove(+id);
  }
}
