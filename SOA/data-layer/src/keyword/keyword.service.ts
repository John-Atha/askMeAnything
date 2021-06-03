import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateKeywordDto } from './dto/create-keyword.dto';
import { Keyword } from './entities/keyword.entity';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { paginate, verify } from '../../general_methods/methods';
const jwt = require('jsonwebtoken');

@Injectable()
export class KeywordService {
  constructor(@InjectEntityManager() private manager: EntityManager) {}

  async create(createKeywordDto: CreateKeywordDto): Promise<Keyword> {
    return this.manager.transaction(async (manager) => {
      const keyword = await manager.create(Keyword, createKeywordDto);
      return manager.save(keyword);
    });
  }

  async findAll() {
    return this.manager.find(Keyword);
  }

  async findOne(params: any) {
    console.log(params);
    let keyword = null;
    let relations = [];
    if (params.questions) relations.push('questions');
    if (params.questionsOwner) relations.push('questions.owner');
    if (params.id) {
      keyword = await this.manager.findOne(Keyword, params.id, { relations });
    }
    else if (params.name) {
      keyword = await this.manager.findOne(Keyword, {name: params.name}, { relations });
    }
    return keyword;
  }

  async validateCreate(name: string): Promise<boolean> {
    const keyword = await this.manager.find(Keyword, { name: name });
    return !keyword.length;
  }
}
