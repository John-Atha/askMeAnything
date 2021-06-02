import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Request,
  Delete,
  ClassSerializerInterceptor,
  UseInterceptors, ParseIntPipe,
} from '@nestjs/common';
import { AnswerService } from './answer.service';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { UpdateAnswerDto } from './dto/update-answer.dto';

@Controller('answers')
@UseInterceptors(ClassSerializerInterceptor)
export class AnswerController {
  constructor(private readonly answerService: AnswerService) {}

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.answerService.findOne(id);
  }
  @Get(':id/upvotes')
  findOneUpvotes(@Param('id', ParseIntPipe) id: number) {
    return this.answerService.findOneUpvotes(id);
  }

  @Get(':answer_id/upvoted/:user_id')
  IsUpvoted(@Param('answer_id', ParseIntPipe) answer_id: number,
            @Param('user_id', ParseIntPipe) user_id: number) {
    return this.answerService.isUpvoted(answer_id, user_id);
  }
  @Post()
  create(@Request() req, @Body() createAnswerDto: CreateAnswerDto) {
    return this.answerService.create(req, createAnswerDto);
  }

  @Patch(':id')
  update(@Request() req, @Param('id', ParseIntPipe) id: number, @Body() updateAnswerDto: UpdateAnswerDto) {
    return this.answerService.update(req, id, updateAnswerDto);
  }

  @Delete(':id')
  remove(@Request() req, @Param('id', ParseIntPipe) id: number) {
    return this.answerService.remove(req, id);
  }
}
