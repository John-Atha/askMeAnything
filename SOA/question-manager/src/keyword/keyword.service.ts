import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateKeywordDto } from './dto/create-keyword.dto';
import { paginate, verify } from '../../general-methods/methods';
import { createKeyword, getAllKeywords, getOneKeyword } from 'async_calls/async_calls';

@Injectable()
export class KeywordService {
  constructor() {}

  async create(req, createKeywordDto: CreateKeywordDto): Promise<any> {
      const user_id = await verify(req);
      return createKeyword(createKeywordDto)
            .then(response => { return response.data })
            .catch(err => { throw new BadRequestException(err.response.data.message)});
  }

  async findAll(params: any): Promise<any> {
    const keywords = await getAllKeywords();
    return paginate(keywords.data, params);
  }

  async findOne(id: number): Promise<any> {
    const keyword = await getOneKeyword({ id, questions: true });
    if (!keyword.data) {
      throw new NotFoundException(`Keyword '${id}' not found.`);
    }
    return keyword.data;
  }
}
