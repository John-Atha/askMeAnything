import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { QuestionUpvoteService } from './question-upvote.service';
import { CreateQuestionUpvoteDto } from './dto/create-question-upvote.dto';
import { UpdateQuestionUpvoteDto } from './dto/update-question-upvote.dto';

@Controller('question-upvote')
export class QuestionUpvoteController {
  constructor(private readonly questionUpvoteService: QuestionUpvoteService) {}

  @Post()
  create(@Body() createQuestionUpvoteDto: CreateQuestionUpvoteDto) {
    return this.questionUpvoteService.create(createQuestionUpvoteDto);
  }

  @Get()
  findAll() {
    return this.questionUpvoteService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.questionUpvoteService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateQuestionUpvoteDto: UpdateQuestionUpvoteDto) {
    return this.questionUpvoteService.update(+id, updateQuestionUpvoteDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.questionUpvoteService.remove(+id);
  }
}
