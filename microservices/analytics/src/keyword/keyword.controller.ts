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
    return this.keywordService.findAll(reqParams, id, year, month-1);
  }

  @Get(':id/questions/yearly/:year')
  findKeywordQuestionsYearly(
    @Query() reqParams,
    @Param('id', ParseIntPipe) id: number,
    @Param('year', ParseIntPipe) year: number,
  ) {
    return this.keywordService.findAll(reqParams, id, year, null);
  }

  @Get(':id/questions')
  findKeywordQuestionsAll(
    @Query() reqParams,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.keywordService.findAll(reqParams, id, null, null);
  }

}
