import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateQuestionUpvoteDto } from './dto/create-question-upvote.dto';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { User } from '../user/entities/user.entity';
import { Question } from 'src/question/entities/question.entity';
import { QuestionUpvote } from './entities/question-upvote.entity';
import { addNestedOwnerToObj, getToken, verify } from '../../general_methods/methods';
import { pointsUpd } from 'async_calls/async_calls';


@Injectable()
export class QuestionUpvoteService {
  constructor(@InjectEntityManager() private manager: EntityManager) {}

  async create(req, createQuestionUpvoteDto: CreateQuestionUpvoteDto): Promise<any> {
    return this.manager.transaction(async (manager) => {
      /* validate input */
      const user_id = await verify(req);
      console.log(`Decoded user id: ${user_id}`);
      const user = await manager.findOne(User, user_id);
      if (!user) {
        throw new UnauthorizedException();
      }
      const question_id = createQuestionUpvoteDto.question.id;
      const question = await manager.findOne(Question, question_id, { relations: ['owner'] });
      if (!question) {
        throw new NotFoundException(`Question '${question_id}' not found.`);
      }
      const allowed = await this.validateCreate(user, question);
      if (!allowed) {
        throw new BadRequestException(`You have already upvoted this question.`);
      }
      /* create upvote */
      createQuestionUpvoteDto['owner'] = {
        id: user.id,
      };
      const upvote = await manager.create(QuestionUpvote, createQuestionUpvoteDto);
      upvote.owner = user;
      upvote.question = question;
      /* increment question owner's points*/
      let owner = question.owner;
      const token = getToken(req);
      owner = await pointsUpd(owner.id, token, 'incr');
      /* save and return full upvote nested object */
      const newUpv = await manager.save(upvote);
      await addNestedOwnerToObj(upvote.question, upvote.question.owner.id);
      return addNestedOwnerToObj(newUpv, user.id);
    });
  }

  async remove(req, id: number) {
    return this.manager.transaction(async (manager) => {
      /* validate input */
      const user_id = await verify(req);
      const user = await manager.findOne(User, user_id);
      if (!user) {
        throw new UnauthorizedException();
      }
      const upvote = await manager.findOne(QuestionUpvote, id, {
        relations: ['owner', 'question', 'question.owner'],
      });
      if (!upvote) {
        throw new NotFoundException(`Upvote '${id}' not found.`);
      }
      if (user.id !== upvote.owner.id) {
        throw new BadRequestException(`You cannot delete another user's upvote.`);
      }
      /* decrease question owner's points*/
      const token = getToken(req);
      let owner = upvote.question.owner;
      owner = await pointsUpd(owner.id, token, 'decr');
      /* delete upvote */
      return manager.delete(QuestionUpvote, id);
    });
  }

  async validateCreate(owner: User, question: Question): Promise<boolean> {
    const upvotes = await this.manager.find(QuestionUpvote, { owner, question });
    return !upvotes.length;
  }
}
