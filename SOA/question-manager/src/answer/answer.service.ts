import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { AnswerUpvote } from '../answer-upvote/entities/answer-upvote.entity';
import { Answer } from '../answer/entities/answer.entity';

@Injectable()
export class AnswerService {
  constructor(@InjectEntityManager() private manager: EntityManager) {}

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

  async findOneUpvotes(id: number, params): Promise<AnswerUpvote[]> {
    const answer = await this.manager.findOne(Answer, id);
    if (!answer) {
      throw new NotFoundException(`Answer '${id}' not found.`);
    }
    let upvotes = await this.manager.find(AnswerUpvote, { relations: ['owner', 'answer'] });
    upvotes = upvotes.filter((upvote) => {
      return upvote['answer']['id'] === id;
    });
    return this.paginate(upvotes, params);
  }
}
