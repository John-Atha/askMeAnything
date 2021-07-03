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
  findOne(@Query() reqParams: any) {
    return this.questionService.findOne(reqParams);
  }

  @Get()
  find(@Query() reqParams: any) {
    return this.questionService.find(reqParams);
  }

  @Post('count-ups')
  countUpvotes(@Body() body: any) {
    return this.questionService.questionsCountUpvotes(body);
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

  @Get(':id/answers/count-upvotes')
  AnswerCountUpvotes(@Param('id', ParseIntPipe) id: number) {
    return this.questionService.AnswerCountUpvotes(id);
  }

  @Get(':id/upvotes')
  Upvotes(@Param('id', ParseIntPipe) id: number) {
    return this.questionService.findUpvotes(id);
  }

  @Get(':quest_id/upvoted/:user_id')
  Upvoted(@Param('user_id', ParseIntPipe) user_id: number,
          @Param('quest_id', ParseIntPipe) quest_id: number) {
    return this.questionService.isUpvoted(user_id, quest_id);
  }

  @Get(':id/keywords')
  Keywords(@Param('id', ParseIntPipe) id: number) {
    return this.questionService.findKeywords(id);
  }

  @Post(':quest_id/keywords/:keyword_id')
  AttachKeyword(
    @Param('quest_id', ParseIntPipe) quest_id: number,
    @Param('keyword_id', ParseIntPipe) keyword_id: number,
  ) {
    return this.questionService.updKeywords(quest_id, keyword_id, 'attach');
  }

  @Delete(':quest_id/keywords/:keyword_id')
  DeAttachKeyword(
    @Param('quest_id', ParseIntPipe) quest_id: number,
    @Param('keyword_id', ParseIntPipe) keyword_id: number,
  ) {
    return this.questionService.updKeywords(quest_id, keyword_id, 'deattach');
  }

  @Get('/stats/monthly')
  findQuestionsStatsMonthly() {
    return this.questionService.findStatsMonthly();
  }

  @Get('/stats/daily')
  findQuestionsStatsDaily() {
    return this.questionService.findStatsDaily();
  }

}
