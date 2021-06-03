import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateQuestionUpvoteDto } from './dto/create-question-upvote.dto';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { verify } from '../../general-methods/methods';
import { User } from '../user/entities/user.entity';
import { Question } from '../question/entities/question.entity';
import { QuestionUpvote } from './entities/question-upvote.entity';
import { questionIsUpvoted, getOneQuestion, getOneUser, createQuestionUpvote, getOneQuestionUpvote, deleteQuestionUpvote } from 'async_calls/async_calls';

@Injectable()
export class QuestionUpvoteService {
  constructor(@InjectEntityManager() private manager: EntityManager) {}

  async create(req, createQuestionUpvoteDto: CreateQuestionUpvoteDto): Promise<any> {
    return this.manager.transaction(async (manager) => {
      const user_id = verify(req);
      //const user = await manager.findOne(User, user_id);
      const user = await getOneUser({ id: user_id });
      if (!user.data) {
        throw new UnauthorizedException();
      }
      const question_id = createQuestionUpvoteDto.question.id;
      //const question = await manager.findOne(Question, question_id, { relations: ['owner'] });
      const params = {
        id: question_id,
        owner: true,
      }
      const question = await getOneQuestion(params);
      if (!question.data) {
        throw new NotFoundException(`Question '${question_id}' not found.`);
      }
      const allowed = await this.validateCreate(user.data.id, question.data.id);
      if (!allowed) {
        throw new BadRequestException(`You have already upvoted this question.`);
      }
      createQuestionUpvoteDto['owner'] = {
        id: user.data.id,
      };
      //const upvote = await manager.create(QuestionUpvote, createQuestionUpvoteDto);
      const upvote = await createQuestionUpvote(createQuestionUpvoteDto);
      return upvote.data;
      /*upvote.owner = user;
      upvote.question = question;
      const owner = question.owner;
      owner.points++;
      await manager.save(owner);
      return manager.save(upvote);*/
    });
  }

  async remove(req, id: number) {
    return this.manager.transaction(async (manager) => {
      const user_id = verify(req);
      //const user = await manager.findOne(User, user_id);
      const user = await getOneUser({ id: user_id });
      if (!user.data) {
        throw new UnauthorizedException();
      }
      /*const upvote = await manager.findOne(QuestionUpvote, id, {
        relations: ['owner', 'question', 'question.owner'],
      });*/
      const params = {
        id,
        owner: true,
        question: true,
        questionOwner: true,
      }
      const upvote = await getOneQuestionUpvote(params);
      if (!upvote.data) {
        throw new NotFoundException(`Upvote '${id}' not found.`);
      }
      if (user.data.id !== upvote.data.owner.id) {
        throw new BadRequestException(`You cannot delete another user's upvote.`);
      }
      /*const question = upvote.data.question;
      const owner = question.data.owner;
      if (owner.points) owner.points--;
      await manager.save(owner);
      return manager.delete(QuestionUpvote, id);*/
      const res = await deleteQuestionUpvote(id);
      return res.data;
    });
  }

  async validateCreate(user_id: number, question_id: number): Promise<boolean> {
    //const upvotes = await this.manager.find(QuestionUpvote, { owner: user, question: question });
    const upvotes = await questionIsUpvoted(user_id, question_id);
    return !upvotes.data.length;
  }
}
