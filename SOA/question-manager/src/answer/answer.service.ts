import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { AnswerUpvote } from '../answer-upvote/entities/answer-upvote.entity';
import { Answer } from '../answer/entities/answer.entity';
import { paginate } from '../../general-methods/methods';

@Injectable()
export class AnswerService {
  constructor(@InjectEntityManager() private manager: EntityManager) {}

  async findOneUpvotes(id: number, params): Promise<AnswerUpvote[]> {
    const answer = await this.manager.findOne(Answer, id);
    if (!answer) {
      throw new NotFoundException(`Answer '${id}' not found.`);
    }
    let upvotes = await this.manager.find(AnswerUpvote, { relations: ['owner', 'answer'] });
    upvotes = upvotes.filter((upvote) => {
      return upvote['answer']['id'] === id;
    });
    return paginate(upvotes, params);
  }
}
