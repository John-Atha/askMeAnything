import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { AnswerUpvote } from '../answer-upvote/entities/answer-upvote.entity';
import { Answer } from '../answer/entities/answer.entity';
import { User } from '../user/entities/user.entity';
import { paginate, verify } from '../../general-methods/methods';

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

  async isUpvoted(id: number, req): Promise<any> {
    return this.manager.transaction( async (manager) => {
      const user_id = verify(req);
      const user = await manager.findOne(User, user_id);
      if (!user) {
        throw new UnauthorizedException();
      }
      const answer = await manager.findOne(Answer, id, { relations: ['upvotes', 'owner'] });
      if (!answer) {
        throw new NotFoundException(`Answer '${id}' not found.`);
      }
      const upvotes = answer.upvotes;
      for (let i=0; i<upvotes.length; i++) {
        const upvoteId = upvotes[i].id;
        const upvote = await manager.findOne(AnswerUpvote, upvoteId, { relations: ['owner'] });
        if (!upvote) {
          throw new NotFoundException(`Answer upvote '${upvoteId}' not found.`);
        }
        if (upvote.owner.id === user.id) {
          return {
            upvoted: true,
            id: upvote.id,
          };
        }
      }
      return {
        upvoted: false,
      };
    });
  }

  async findOne(id: number): Promise<any> {
    const answer = await this.manager.findOne(Answer, id);
    if (!answer) {
      throw new NotFoundException(`Answer ${id} not found.`);
    }
    const count = await this.manager.query(
      `SELECT COUNT(*) FROM public."answer_upvote" WHERE public."answer_upvote"."answerId"=${id}`,
    );
    answer['upvotesCount'] = await parseInt(count[0]['count']);
    return answer;
  }
}
