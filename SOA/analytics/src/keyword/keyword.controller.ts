import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { KeywordService } from './keyword.service';

@Controller('keywords')
@UseInterceptors(ClassSerializerInterceptor)
export class KeywordController {
  constructor(private readonly keywordService: KeywordService) {}

  @Get(':id/questions/monthly/:year/:month')
  findKeywordQuestionsMonthly(
    @Query() reqParams,
    @Param('id', ParseIntPipe) id: number,
    @Param('year', ParseIntPipe) year: number,
    @Param('month', ParseIntPipe) month: number,
  ) {
    return this.keywordService.findQuestionsMonthly(reqParams, id, year, month);
  }
}
