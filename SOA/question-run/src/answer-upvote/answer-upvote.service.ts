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
import { answerIsUpvoted, createAnswerUpvote, deleteAnswerUpvote, getOneAnswer, getOneAnswerUpvote, getOneUser } from 'async_calls/async_calls';

@Injectable()
export class AnswerUpvoteService {
  constructor(@InjectEntityManager() private manager: EntityManager) {}

  async create(req, createAnswerUpvoteDto: CreateAnswerUpvoteDto): Promise<any> {
    return this.manager.transaction(async (manager) => {
      const user_id = verify(req);
      //const owner = await manager.findOne(User, user_id);
      const owner = await getOneUser({id: user_id});
      if (!owner.data) {
        throw new UnauthorizedException();
      }
      const answer_id = createAnswerUpvoteDto.answer.id;
      //const answer = await manager.findOne(Answer, answer_id, { relations: ['owner'] });
      const answer = await getOneAnswer({id: answer_id, owner: true});
      if (!answer.data) {
        throw new NotFoundException(`Answer '${answer_id}' not found.`);
      }
      const allowed = await this.validateCreate(owner.data.id, answer.data.id);
      if (!allowed) {
        throw new BadRequestException(`You have already upvoted this answer.`);
      }
      createAnswerUpvoteDto['owner'] = {
        id: owner.data.id,
      };
      /*const upvote = await manager.create(AnswerUpvote, createAnswerUpvoteDto);
      upvote.owner = owner;
      upvote.answer = answer;
      const answer_owner = answer.owner;
      answer_owner.points++;
      await manager.save(answer_owner);
      return manager.save(upvote);*/
      
      const upvote = await createAnswerUpvote(createAnswerUpvoteDto);
      return upvote.data;
    });
  }

  async remove(req, id: number) : Promise<any> {
    return this.manager.transaction(async (manager) => {
      const user_id = verify(req);
      //const owner = await manager.findOne(User, user_id);
      const owner = await getOneUser({id: user_id});
      if (!owner.data) {
        throw new UnauthorizedException();
      }
      const params = {
        id,
        owner: true,
        answer: true,
        answerOwner: true,
      }
      //const upvote = await manager.findOne(AnswerUpvote, id, { relations: ['owner', 'answer', 'answer.owner'] });
      const upvote = await getOneAnswerUpvote(params);
      if (!upvote.data) {
        throw new NotFoundException(`Upvote '${id}' not found.`);
      }
      if (upvote.data.owner.id !== owner.data.id) {
        throw new BadRequestException(
          `You cannot delete another user's upvote.`,
        );
      }
      /*const answer = upvote.answer;
      const answer_owner = upvote.answer.owner;
      if (answer_owner.points) answer_owner.points--;
      await manager.save(answer_owner);
      return manager.delete(AnswerUpvote, id);*/
      const res = await deleteAnswerUpvote(id);
      return res.data;
    });
  }

  async validateCreate(user_id: number, answer_id: number): Promise<boolean> {
    //const upvotes = await this.manager.find(AnswerUpvote, { owner: user, answer: answer});
    const upvotes = await answerIsUpvoted(user_id, answer_id);
    console.log(upvotes.data);
    return !upvotes.data.length;
  }
}
