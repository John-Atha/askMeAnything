import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  ParseIntPipe,
  ClassSerializerInterceptor,
  UseInterceptors,
  Query,
} from '@nestjs/common';
import { AnswerUpvoteService } from './answer-upvote.service';
import { CreateAnswerUpvoteDto } from './dto/create-answer-upvote.dto';

@Controller('answer-upvotes')
@UseInterceptors(ClassSerializerInterceptor)
export class AnswerUpvoteController {
  constructor(private readonly answerUpvoteService: AnswerUpvoteService) {}

  @Post()
  create(@Body() createAnswerUpvoteDto: any) {
    return this.answerUpvoteService.create(createAnswerUpvoteDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.answerUpvoteService.remove(id);
  }

  @Get('one')
  findOne(@Query() reqParams: any) {
    return this.answerUpvoteService.findOne(reqParams);  
  }

}
