import {
  BadRequestException,
  Injectable,
} from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { User } from '../user/entities/user.entity';
import { Answer } from '../answer/entities/answer.entity';
import { AnswerUpvote } from './entities/answer-upvote.entity';

@Injectable()
export class AnswerUpvoteService {
  constructor(@InjectEntityManager() private manager: EntityManager) {}

  async findOne(params: any): Promise<AnswerUpvote> {
    let upvote = null;
    if (params.id) {
      let relations = [];
      if (params.owner) relations.push('owner');
      if (params.answer) relations.push('answer');
      if (params.answerOwner) relations.push('answer.owner');
      upvote = await this.manager.findOne(AnswerUpvote, params.id, { relations });  
    }
    return upvote;
  }

  async create(createAnswerUpvoteDto: any): Promise<AnswerUpvote> {
    return this.manager.transaction(async (manager) => {
      let upvote = null;
      if (createAnswerUpvoteDto.owner.id && createAnswerUpvoteDto.answer.id) {
        const owner = await manager.findOne(User, createAnswerUpvoteDto.owner.id);
        const answer = await manager.findOne(Answer, createAnswerUpvoteDto.answer.id, { relations: ['owner'] });
        const old = await manager.findOne(AnswerUpvote, { owner, answer} );
        if (old) throw new BadRequestException(`You have already upvoted this answer.`);
        const upvote = await manager.create(AnswerUpvote, createAnswerUpvoteDto);
        upvote.owner = owner;
        upvote.answer = answer;
        const answer_owner = answer.owner;
        answer_owner.points++;
        await manager.save(answer_owner);
        return manager.save(upvote);     
      }
      return upvote;
    });
  }

  async remove(id: number): Promise<any> {
    return this.manager.transaction(async (manager) => {
      const upvote = await manager.findOne(AnswerUpvote, id, { relations: ['owner', 'answer', 'answer.owner'] });
      if (!upvote) throw new BadRequestException(`Upvote '${id}' not found`);
      const answer_owner = upvote.answer.owner;
      if (answer_owner.points) answer_owner.points--;
      await manager.save(answer_owner);
      return manager.delete(AnswerUpvote, id);
    });
  }
  
}
