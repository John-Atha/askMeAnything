import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { QuestionUpvoteService } from './question-upvote.service';
import { CreateQuestionUpvoteDto } from './dto/create-question-upvote.dto';

@Controller('question-upvote')
export class QuestionUpvoteController {
  constructor(private readonly questionUpvoteService: QuestionUpvoteService) {}

  @Post()
  create(@Body() createQuestionUpvoteDto: CreateQuestionUpvoteDto) {
    return this.questionUpvoteService.create(createQuestionUpvoteDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.questionUpvoteService.remove(+id);
  }
}
