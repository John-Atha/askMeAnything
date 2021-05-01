import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Request,
  Delete, ParseIntPipe,
} from '@nestjs/common';
import { QuestionUpvoteService } from './question-upvote.service';
import { CreateQuestionUpvoteDto } from './dto/create-question-upvote.dto';

@Controller('question-upvotes')
export class QuestionUpvoteController {
  constructor(private readonly questionUpvoteService: QuestionUpvoteService) {}

  @Post()
  create(@Request() req, @Body() createQuestionUpvoteDto: CreateQuestionUpvoteDto) {
    return this.questionUpvoteService.create(req, createQuestionUpvoteDto);
  }

  @Delete(':id')
  remove(@Request() req, @Param('id', ParseIntPipe) id: number) {
    return this.questionUpvoteService.remove(req, id);
  }
}
