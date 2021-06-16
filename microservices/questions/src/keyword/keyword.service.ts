import { Injectable } from '@nestjs/common';
import { CreateKeywordDto } from './dto/create-keyword.dto';

@Injectable()
export class KeywordService {
  create(createKeywordDto: CreateKeywordDto) {
    return 'This action adds a new keyword';
  }

  findAll() {
    return `This action returns all keyword`;
  }

  findOne(id: number) {
    return `This action returns a #${id} keyword`;
  }

  remove(id: number) {
    return `This action removes a #${id} keyword`;
  }
}
