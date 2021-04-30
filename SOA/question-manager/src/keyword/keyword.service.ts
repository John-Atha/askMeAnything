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
import { jwtConstants } from '../constants';
const jwt = require('jsonwebtoken');

@Injectable()
export class KeywordService {
  constructor(@InjectEntityManager() private manager: EntityManager) {}

  async create(req, createKeywordDto: CreateKeywordDto): Promise<Keyword> {
    const user_id = this.verify(req);
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
    return this.paginate(keywords, params);
  }

  async findOne(id: number) {
    const keyword = await this.manager.findOne(Keyword, id, { relations: ['questions'] });
    if (!keyword) {
      throw new NotFoundException(`Keyword '${id}' not found.`);
    }
    return keyword;
  }

  verify(req): number {
    const headers = req['rawHeaders'];
    let token = '';
    headers.forEach((header) => {
      if (header.startsWith('Bearer')) {
        token = header.slice(7);
      }
    });
    let decoded = {};
    try {
      decoded = jwt.verify(token, jwtConstants.secret);
    } catch (error) {
      console.log(error);
      throw new UnauthorizedException();
    }
    return decoded['sub'];
  }

  async validateCreate(name: string): Promise<boolean> {
    const keyword = await this.manager.find(Keyword, { name: name });
    return !keyword.length;
  }

  validateParams(params): void {
    if (params.start !== undefined) {
      if (!parseInt(params.start)) {
        throw new BadRequestException(`Invalid start parameter.`);
      }
    }
    if (params.end !== undefined) {
      if (!parseInt(params.end)) {
        throw new BadRequestException(`Invalid end parameter.`);
      }
    }
  }

  paginate(res, params): any {
    this.validateParams(params);
    if (!res.length) {
      return res;
    }
    if (params.start > res.length) {
      return [];
    }
    const start = parseInt(params.start) - 1 || 0;
    const end =
      parseInt(params.end) || (parseInt(params.end) === 0 ? 0 : res.length);
    console.log(`start: ${start}`);
    console.log(`end: ${end}`);
    if (start >= end || start <= -1 || end === 0) {
      throw new BadRequestException('Invalid parameters');
    }
    return res.slice(start, end);
  }
}
