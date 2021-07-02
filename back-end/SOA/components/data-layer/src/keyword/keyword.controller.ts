import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { KeywordService } from './keyword.service';
import { CreateKeywordDto } from './dto/create-keyword.dto';

@Controller('keywords')
export class KeywordController {
  constructor(private readonly keywordService: KeywordService) {}

  @Post()
  create(@Body() createKeywordDto: CreateKeywordDto) {
    return this.keywordService.create(createKeywordDto);
  }

  @Get()
  findAll() {
    return this.keywordService.findAll();
  }

  @Get('one')
  findOne(@Query() reqParams) {
    return this.keywordService.findOne(reqParams);
  }

  @Get(':id/stats/monthly')
  findKeywordsStatsMonthly(@Param('id', ParseIntPipe) id: number) {
    return this.keywordService.findStatsMonthly(id);
  }

  @Get(':id/stats/daily')
  findKeywordsStatsDaily(@Param('id', ParseIntPipe) id: number) {
    return this.keywordService.findStatsDaily(id);
  }

  @Get('stats')
  findKeywordsStats() {
    return this.keywordService.findStats();
  }
}
