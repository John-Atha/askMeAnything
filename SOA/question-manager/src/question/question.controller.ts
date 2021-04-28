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
  ClassSerializerInterceptor, ParseIntPipe,
} from '@nestjs/common';
import { QuestionService } from './question.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';

@Controller('questions')
@UseInterceptors(ClassSerializerInterceptor)
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @Post()
  create(@Request() req, @Body() createQuestionDto: CreateQuestionDto) {
    return this.questionService.create(req, createQuestionDto);
  }

  @Get()
  findAll(@Query() reqParams) {
    return this.questionService.findAll(reqParams);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.questionService.findOne(id);
  }

  @Patch(':id')
  update(@Request() req, @Param('id', ParseIntPipe) id: number, @Body() updateQuestionDto: UpdateQuestionDto) {
    return this.questionService.update(req, id, updateQuestionDto);
  }

  @Delete(':id')
  remove(@Request() req, @Param('id', ParseIntPipe) id: number) {
    return this.questionService.remove(req, id);
  }

  @Get('users/:id')
  findByUser(@Query() reqParams, @Param('id', ParseIntPipe) id: number) {
    return this.questionService.findByUser(id, reqParams);
  }

  @Get(':id/answers')
  Answers(@Query() reqParams, @Param('id', ParseIntPipe) id: number) {
    return this.questionService.findAnswers(id, reqParams);
  }
}
