import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateKeywordDto } from './dto/create-keyword.dto';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { paginate, verify } from '../../general-methods/methods';
import { createKeyword, getAllKeywords, getOneKeyword } from 'async_calls/async_calls';
const jwt = require('jsonwebtoken');

@Injectable()
export class KeywordService {
  constructor(@InjectEntityManager() private manager: EntityManager) {}

  async create(req, createKeywordDto: CreateKeywordDto): Promise<any> {
    return this.manager.transaction( async () => {
      const user_id = verify(req);
      const allowed = await this.validateCreate(createKeywordDto.name);
      console.log(allowed);
      if (!allowed) {
        throw new BadRequestException(
          `Keyword '${createKeywordDto.name}' already exists.`,
        );
      }
      const keyword = await createKeyword(createKeywordDto);
      return keyword.data;
    })
  }

  async findAll(params: any): Promise<any> {
    //const keywords = await this.manager.find(Keyword);
    const keywords = await getAllKeywords();
    return paginate(keywords.data, params);
  }

  async findOne(id: number): Promise<any> {
    //const keyword = await this.manager.findOne(Keyword, id, { relations: ['questions'] });
    const keyword = await getOneKeyword({ id, questions: true });
    if (!keyword.data) {
      throw new NotFoundException(`Keyword '${id}' not found.`);
    }
    return keyword.data;
  }

  async validateCreate(name: string): Promise<boolean> {
    const keyword = await getOneKeyword({ name });
    return !keyword.data;
  }
}
