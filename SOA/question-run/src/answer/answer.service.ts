import {
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

  async create(req, createAnswerDto: CreateAnswerDto) {
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

  update(id: number, updateAnswerDto: UpdateAnswerDto) {
    return `This action updates a #${id} answer`;
  }

  remove(id: number) {
    return `This action removes a #${id} answer`;
  }
}
