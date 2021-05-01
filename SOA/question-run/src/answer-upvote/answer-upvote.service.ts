import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateAnswerUpvoteDto } from './dto/create-answer-upvote.dto';
import { QuestionUpvote } from '../question-upvote/entities/question-upvote.entity';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { verify } from '../../general-methods/methods';
import { User } from '../user/entities/user.entity';
import { Answer } from '../answer/entities/answer.entity';
import { AnswerUpvote } from './entities/answer-upvote.entity';

@Injectable()
export class AnswerUpvoteService {
  constructor(@InjectEntityManager() private manager: EntityManager) {}

  async create(req, createAnswerUpvoteDto: CreateAnswerUpvoteDto): Promise<AnswerUpvote> {
    return this.manager.transaction(async (manager) => {
      const user_id = verify(req);
      const owner = await manager.findOne(User, user_id);
      if (!owner) {
        throw new UnauthorizedException();
      }
      const answer_id = createAnswerUpvoteDto.answer.id;
      const answer = await manager.findOne(Answer, answer_id);
      if (!answer) {
        throw new NotFoundException(`Answer '${answer_id}' not found.`);
      }
      createAnswerUpvoteDto['owner'] = {
        id: owner.id,
      };
      const upvote = await manager.create(AnswerUpvote, createAnswerUpvoteDto);
      upvote.owner = owner;
      upvote.answer = answer;
      return manager.save(upvote);
    });
  }

  async remove(req, id: number) {
    return this.manager.transaction(async (manager) => {
      const user_id = verify(req);
      const owner = await manager.findOne(User, user_id);
      if (!owner) {
        throw new UnauthorizedException();
      }
      const upvote = await manager.findOne(AnswerUpvote, id, { relations: ['owner'] });
      if (!upvote) {
        throw new NotFoundException(`Upvote '${id}' not found.`);
      }
      if (upvote.owner.id !== owner.id) {
        throw new BadRequestException(
          `You cannot delete another user's upvote.`,
        );
      }
      return manager.delete(AnswerUpvote, id);
    });
  }
}
