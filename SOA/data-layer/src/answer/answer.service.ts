import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { UpdateAnswerDto } from './dto/update-answer.dto';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { verify } from '../../general_methods/methods';
import { Question } from '../question/entities/question.entity';
import { Answer } from './entities/answer.entity';
import { AnswerUpvote } from '../answer-upvote/entities/answer-upvote.entity';
import { User } from '../user/entities/user.entity';

@Injectable()
export class AnswerService {
  constructor(@InjectEntityManager() private manager: EntityManager) {}

  async findOne(id: number): Promise<Answer> {
    let answer = null;
    answer = await this.manager.findOne(Answer, id);
    if (answer) {
      const count = await this.manager.query(
      `SELECT COUNT(*) FROM public."answer_upvote" WHERE public."answer_upvote"."answerId"=${id}`,
      );
      answer['upvotesCount'] = await parseInt(count[0]['count']);
      }
    return answer;
  }

  async findOneUpvotes(id: number): Promise<AnswerUpvote[]> {
    let answer = null;
    answer = await this.manager.findOne(Answer, id, { relations: ['upvotes', 'upvotes.owner']});
    return answer;
  }

  async isUpvoted(answer_id: number, user_id: number): Promise<any> {
    return this.manager.transaction(async (manager) => {
      const user = await manager.findOne(User, user_id);
      const answer = await manager.findOne(Answer, answer_id);
      const upvote = await manager.find(AnswerUpvote, { owner: user, answer: answer} );
      return upvote;
    });
  }

  async create(req, createAnswerDto: CreateAnswerDto): Promise<Answer> {
    return this.manager.transaction(async (manager) => {
      const user_id = verify(req);
      const owner = await manager.findOne(User, user_id);
      if (!owner) {
        throw new UnauthorizedException();
      }
      const question_id = createAnswerDto.question.id;
      const question = await manager.findOne(Question, question_id);
      if (!question) {
        throw new NotFoundException(`Question '${question_id}' not found.`);
      }
      createAnswerDto['owner'] = {
        id: user_id,
      };
      const answer = await manager.create(Answer, createAnswerDto);
      answer.owner = owner;
      answer.question = question;
      return manager.save(answer);
    });
  }

  async update(req, id: number, updateAnswerDto: UpdateAnswerDto): Promise<Answer> {
    return this.manager.transaction(async (manager) => {
      const user_id = verify(req);
      const user = await manager.findOne(User, user_id);
      if (!user) {
        throw new UnauthorizedException();
      }
      const answer = await manager.findOne(Answer, id, { relations: ['owner'] });
      if (!answer) {
        throw new NotFoundException(`Answer '${id}' not found.`);
      }
      if (user.id !== answer.owner.id) {
        throw new BadRequestException(`You cannot update another user's answer.`);
      }
      const text = updateAnswerDto.text;
      if (!text) {
        return answer;
      }
      answer.text = text;
      return manager.save(answer);
    });
  }

  async remove(req, id: number): Promise<any> {
    return this.manager.transaction(async (manager) => {
      const user_id = verify(req);
      const user = await manager.findOne(User, user_id);
      if (!user) {
        throw new UnauthorizedException();
      }
      const answer = await manager.findOne(Answer, id, { relations: ['owner'] });
      if (!answer) {
        throw new NotFoundException(`Answer '${id} not found.`);
      }
      if (user.id !== answer.owner.id) {
        throw new BadRequestException(
          `You cannot delete another user's answer.`,
        );
      }
      return manager.delete(Answer, id);
    });
  }
}
