import { Injectable } from '@nestjs/common';

@Injectable()
export class KeywordService {
  findAll() {
    return `This action returns all keyword`;
  }

  findOne(id: number) {
    return `This action returns a #${id} keyword`;
  }
}
