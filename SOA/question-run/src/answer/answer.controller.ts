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
  UseInterceptors,
} from '@nestjs/common';
import { AnswerService } from './answer.service';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { UpdateAnswerDto } from './dto/update-answer.dto';

@Controller('answers')
@UseInterceptors(ClassSerializerInterceptor)
export class AnswerController {
  constructor(private readonly answerService: AnswerService) {}

  @Post()
  create(@Request() req, @Body() createAnswerDto: CreateAnswerDto) {
    return this.answerService.create(req, createAnswerDto);
  }

  @Patch(':id')
  update(@Request() req, @Param('id') id: string, @Body() updateAnswerDto: UpdateAnswerDto) {
    return this.answerService.update(+id, updateAnswerDto);
  }

  @Delete(':id')
  remove(@Request() req, @Param('id') id: string) {
    return this.answerService.remove(+id);
  }
}
