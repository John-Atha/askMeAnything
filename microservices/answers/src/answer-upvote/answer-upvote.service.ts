import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateAnswerUpvoteDto } from './dto/create-answer-upvote.dto';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { addNestedOwnerToObj, getToken, verify } from 'general_methods/methods';
import { User } from '../user/entities/user.entity';
import { Answer } from 'src/answer/entities/answer.entity';
import { AnswerUpvote } from './entities/answer-upvote.entity';
import { pointsUpd } from 'async_calls/async_calls';
@Injectable()
export class AnswerUpvoteService {
  constructor(@InjectEntityManager() private manager: EntityManager) {}

  async create(req, createAnswerUpvoteDto: CreateAnswerUpvoteDto): Promise<any> {
    return this.manager.transaction(async (manager) => {
      /* verify user and answer */
      const user_id = await verify(req);
      const owner = await manager.findOne(User, user_id);
      if (!owner) {
        throw new UnauthorizedException();
      }
      const answer_id = createAnswerUpvoteDto.answer.id;
      const answer = await manager.findOne(Answer, answer_id, { relations: ['owner'] });
      if (!answer) {
        throw new NotFoundException(`Answer '${answer_id}' not found.`);
      }
      const allowed = await this.validateCreate(owner, answer);
      if (!allowed) {
        throw new BadRequestException(`You have already upvoted this answer.`);
      }
      /* create upvote */
      createAnswerUpvoteDto['owner'] = {
        id: owner.id,
      };
      console.log(createAnswerUpvoteDto);
      let upvote = await manager.create(AnswerUpvote, createAnswerUpvoteDto);
      /* add nested answer object */
      upvote.answer = answer;
      /* increase answer owner's points */
      const token = getToken(req);
      const newOwner = await pointsUpd(answer.owner.id, token, 'incr');
      upvote.answer.owner = newOwner.data;
      /* add nested owner object, after all points updated (maybe upvote.owner === upvote.answer.owner */
      upvote = await addNestedOwnerToObj(upvote, upvote.owner.id);
      console.log('----------------------------------------------Fine till here.')
      /* save upvote */
      console.log(upvote);
      return manager.save(upvote);      
    });
  }

  async remove(req, id: number) : Promise<any> {
    return this.manager.transaction(async (manager) => {
      /* validate user and upvote */
      const user_id = await verify(req);
      const user = await manager.findOne(User, user_id);
      if (!user) {
        throw new UnauthorizedException();
      }
      const upvote = await manager.findOne(AnswerUpvote, id, { relations: ['owner', 'answer', 'answer.owner'] });
      if (!upvote) {
        throw new NotFoundException(`Upvote '${id}' not found.`);
      }
      if (upvote.owner.id !== user.id) {
        throw new BadRequestException(
          `You cannot delete another user's upvote.`,
        );
      }
      /* decrease answer owner's points */
      const token = getToken(req);
      await pointsUpd(upvote.answer.owner.id, token, 'decr');
      /* delete upvote */
      return manager.delete(AnswerUpvote, id);
    });
  }

  async validateCreate(user: User, answer: Answer): Promise<boolean> {
    const upvotes = await this.manager.find(AnswerUpvote, { owner: user, answer: answer});
    return !upvotes.length;
  }
}
