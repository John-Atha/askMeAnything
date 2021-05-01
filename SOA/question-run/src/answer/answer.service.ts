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
import { verify } from '../../general-methods/methods';
import { Question } from '../question/entities/question.entity';
import { Answer } from './entities/answer.entity';
import { User } from '../user/entities/user.entity';

@Injectable()
export class AnswerService {
  constructor(@InjectEntityManager() private manager: EntityManager) {}

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
