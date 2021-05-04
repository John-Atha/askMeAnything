import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Query,
  Request,
  UseInterceptors,
} from '@nestjs/common';
import { AnswerService } from './answer.service';

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

  @Get(':id/upvoted')
  IsUpvoted(@Request() req, @Param('id', ParseIntPipe) id: number) {
    return this.answerService.isUpvoted(id, req);
  }
}
