import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  UseInterceptors,
} from '@nestjs/common';
import { KeywordService } from './keyword.service';

@Controller('keywords')
@UseInterceptors(ClassSerializerInterceptor)
export class KeywordController {
  constructor(private readonly keywordService: KeywordService) {}

  @Get()
  findAll() {
    return this.keywordService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.keywordService.findOne(+id);
  }
}
