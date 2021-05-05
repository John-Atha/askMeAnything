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

@Injectable()
export class QuestionUpvoteService {
  constructor(@InjectEntityManager() private manager: EntityManager) {}

  async create(
    req,
    createQuestionUpvoteDto: CreateQuestionUpvoteDto,
  ): Promise<QuestionUpvote> {
    return this.manager.transaction(async (manager) => {
      const user_id = verify(req);
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
      createQuestionUpvoteDto['owner'] = {
        id: user.id,
      };
      const upvote = await manager.create(QuestionUpvote, createQuestionUpvoteDto);
      upvote.owner = user;
      upvote.question = question;
      const owner = question.owner;
      owner.points++;
      await manager.save(owner);
      return manager.save(upvote);
    });
  }

  async remove(req, id: number) {
    return this.manager.transaction(async (manager) => {
      const user_id = verify(req);
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
      const question = upvote.question;
      const owner = question.owner;
      if (owner.points) owner.points--;
      await manager.save(owner);
      return manager.delete(QuestionUpvote, id);
    });
  }

  async validateCreate(user: User, question: Question): Promise<boolean> {
    const upvotes = await this.manager.find(QuestionUpvote, { owner: user, question: question });
    return !upvotes.length;
  }
}
