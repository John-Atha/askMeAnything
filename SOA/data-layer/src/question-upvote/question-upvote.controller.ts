import {
  Controller,
  Get,
  Post,
  Body,
  Query,
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
  create(@Body() createQuestionUpvoteDto: any) {
    return this.questionUpvoteService.create(createQuestionUpvoteDto);
  }

  @Delete(':id')
  remove(@Request() req, @Param('id', ParseIntPipe) id: number) {
    return this.questionUpvoteService.remove(id);
  }

  @Get('one')
  findOne(@Query() reqParams: any) {
    return this.questionUpvoteService.findOne(reqParams);  
  }
}
