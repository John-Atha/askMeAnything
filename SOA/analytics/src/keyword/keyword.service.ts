import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';

@Injectable()
export class KeywordService {
  constructor(@InjectEntityManager() private manager: EntityManager) {}

  findAll() {
    return `This action returns all keyword`;
  }

  findOne(id: number) {
    return `This action returns a #${id} keyword`;
  }
}
