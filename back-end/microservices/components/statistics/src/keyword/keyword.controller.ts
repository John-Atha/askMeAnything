import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { KeywordService } from './keyword.service';

@Controller('keywords')
export class KeywordController {
  constructor(private readonly keywordService: KeywordService) {}

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
