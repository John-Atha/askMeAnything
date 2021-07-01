import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateKeywordDto } from './dto/create-keyword.dto';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { addNestedOwnerToObj, paginate, verify } from '../../general_methods/methods';
import { Keyword } from './entities/keyword.entity';
import { choreoPost } from 'async_calls/async_calls';

const jwt = require('jsonwebtoken');

@Injectable()
export class KeywordService {
  constructor(@InjectEntityManager() private manager: EntityManager) {}

  async create(req, createKeywordDto: CreateKeywordDto): Promise<any> {
    return this.manager.transaction( async (manager) => {
      const user_id = await verify(req);
      const allowed = await this.validateCreate(createKeywordDto.name);
      console.log(allowed);
      if (!allowed) {
        throw new BadRequestException(
          `Keyword '${createKeywordDto.name}' already exists.`,
        );
      }
      const keyword = await manager.create(Keyword, createKeywordDto);
      const res = await manager.save(keyword);
      /* SEND IT TO THE CHOREOGRAPHER */
      choreoPost('post', res, -1, 'keyword')
      .then(response => {
        console.log(response.data);
      })
      .catch(err => {
        console.log(err);
      })
      return res;
    })
  }

  async findAll(params: any): Promise<any> {
    const keywords = await this.manager.find(Keyword);
    return paginate(keywords, params);
  }

  async findOne(id: number): Promise<any> {
    const keyword = await this.manager.findOne(Keyword, id, { relations: ['questions'] });
    if (!keyword) {
      throw new NotFoundException(`Keyword '${id}' not found.`);
    }
    return keyword;
  }

  async validateCreate(name: string): Promise<boolean> {
    const keyword = await this.manager.find(Keyword, { name });
    return !keyword.length;
  }
}
