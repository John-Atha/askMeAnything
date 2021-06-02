import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  Query,
  UseInterceptors,
  ClassSerializerInterceptor,
  ParseIntPipe,
} from '@nestjs/common';
import { QuestionService } from './question.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';

@Controller('questions')
@UseInterceptors(ClassSerializerInterceptor)
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @Post()
  create(@Body() body: any) {
    return this.questionService.create(body);
  }

  @Get('one')
  findOne(@Query() reqParams) {
    return this.questionService.findOne(reqParams);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateQuestionDto: UpdateQuestionDto,
  ) {
    return this.questionService.update(id, updateQuestionDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.questionService.remove(id);
  }

  @Get(':id/answers')
  Answers(@Query() reqParams, @Param('id', ParseIntPipe) id: number) {
    return this.questionService.findQuestionsAnswers(id, reqParams);
  }

  @Get(':id/upvotes')
  Upvotes(@Query() reqParams, @Param('id', ParseIntPipe) id: number) {
    return this.questionService.findUpvotes(id, reqParams);
  }

  @Get(':id/upvoted')
  Upvoted(@Request() req, @Param('id', ParseIntPipe) id: number) {
    return this.questionService.isUpvoted(req, id);
  }

  @Get(':id/keywords')
  Keywords(@Param('id', ParseIntPipe) id: number) {
    return this.questionService.findKeywords(id);
  }

  @Post(':quest_id/keywords/:key_id')
  AttachKeyword(
    @Request() req,
    @Param('quest_id', ParseIntPipe) quest_id: number,
    @Param('key_id', ParseIntPipe) key_id: number,
  ) {
    return this.questionService.attachKeyword(req, quest_id, key_id);
  }

  @Delete(':quest_id/keywords/:key_id')
  DetachKeyword(
    @Request() req,
    @Param('quest_id', ParseIntPipe) quest_id: number,
    @Param('key_id', ParseIntPipe) key_id: number,
  ) {
    return this.questionService.detachKeyword(req, quest_id, key_id);
  }
}
