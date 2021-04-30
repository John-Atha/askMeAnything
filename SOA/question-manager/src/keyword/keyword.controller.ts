import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseIntPipe,
  Request,
} from '@nestjs/common';
import { KeywordService } from './keyword.service';
import { CreateKeywordDto } from './dto/create-keyword.dto';

@Controller('keywords')
export class KeywordController {
  constructor(private readonly keywordService: KeywordService) {}

  @Post()
  create(@Request() req, @Body() createKeywordDto: CreateKeywordDto) {
    return this.keywordService.create(req, createKeywordDto);
  }

  @Get()
  findAll(@Query() reqParams) {
    return this.keywordService.findAll(reqParams);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.keywordService.findOne(id);
  }
}
