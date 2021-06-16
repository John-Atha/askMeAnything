import {
  Controller,
  Post,
  Body,
  Param,
  Request,
  Delete,
  ParseIntPipe,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { QuestionUpvoteService } from './question-upvote.service';
import { CreateQuestionUpvoteDto } from './dto/create-question-upvote.dto';

@Controller('question-upvotes')
@UseInterceptors(ClassSerializerInterceptor)
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
