import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateKeywordDto } from './dto/create-keyword.dto';
import { Keyword } from './entities/keyword.entity';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { paginate, verify } from '../../general-methods/methods';
const jwt = require('jsonwebtoken');

@Injectable()
export class KeywordService {
  constructor(@InjectEntityManager() private manager: EntityManager) {}

  async create(req, createKeywordDto: CreateKeywordDto): Promise<Keyword> {
    const user_id = verify(req);
    const allowed = await this.validateCreate(createKeywordDto.name);
    console.log(allowed);
    if (!allowed) {
      throw new BadRequestException(
        `Keyword '${createKeywordDto.name}' already exists.`,
      );
    }
    return this.manager.transaction(async (manager) => {
      const keyword = await manager.create(Keyword, createKeywordDto);
      return manager.save(keyword);
    });
  }

  async findAll(params) {
    const keywords = await this.manager.find(Keyword);
    return paginate(keywords, params);
  }

  async findOne(id: number) {
    const keyword = await this.manager.findOne(Keyword, id, { relations: ['questions'] });
    if (!keyword) {
      throw new NotFoundException(`Keyword '${id}' not found.`);
    }
    return keyword;
  }

  async validateCreate(name: string): Promise<boolean> {
    const keyword = await this.manager.find(Keyword, { name: name });
    return !keyword.length;
  }
}
