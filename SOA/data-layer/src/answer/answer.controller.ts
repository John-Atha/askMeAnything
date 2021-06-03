import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ClassSerializerInterceptor,
  UseInterceptors, ParseIntPipe, Query,
} from '@nestjs/common';
import { AnswerService } from './answer.service';
import { UpdateAnswerDto } from './dto/update-answer.dto';

@Controller('answers')
@UseInterceptors(ClassSerializerInterceptor)
export class AnswerController {
  constructor(private readonly answerService: AnswerService) {}

  @Get('one')
  findOne(@Query() reqParams) {
    return this.answerService.findOne(reqParams);
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
  create(@Body() body: any) {
    return this.answerService.create(body);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateAnswerDto: UpdateAnswerDto) {
    return this.answerService.update(id, updateAnswerDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.answerService.remove(id);
  }
}
