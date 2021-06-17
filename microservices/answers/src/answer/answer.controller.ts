import {
  Controller,
  Get,
  Post,
  Query,
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
  findOneUpvotes(@Query() reqParams, @Param('id', ParseIntPipe) id: number) {
    return this.answerService.findOneUpvotes(id, reqParams);
  }

  @Get(':id/upvotes/count')
  CountOneUpvotes(@Param('id', ParseIntPipe) id: number) {
    return this.answerService.countOneUpvotes(id);
  }

  @Get(':id/upvoted')
  IsUpvoted(@Request() req, @Param('id', ParseIntPipe) id: number) {
    return this.answerService.isUpvoted(id, req);
  }

  @Post()
  create(@Request() req: any, @Body() createAnswerDto: CreateAnswerDto) {
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
