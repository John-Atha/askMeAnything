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
import { addNestedOwnerToObj, addNestedQuestionToObj, verify } from '../../general_methods/methods';
import { User } from '../user/entities/user.entity';
import { Answer } from './entities/answer.entity';
import { Question } from 'src/question/entities/question.entity';
@Injectable()
export class AnswerService {
  constructor(@InjectEntityManager() private manager: EntityManager) {}

  async create(req, createAnswerDto: CreateAnswerDto): Promise<any> {
    return this.manager.transaction(async (manager) => {
      /* verify user and question */
      const user_id = await verify(req);
      const owner = await manager.findOne(User, user_id);
      if (!owner) {
        throw new UnauthorizedException();
      }
      const question_id = createAnswerDto.question.id;
      const question = await manager.findOne(Question, question_id);
      if (!question) {
        throw new NotFoundException(`Question '${question_id}' not found.`);
      }
      /* create answer */
      createAnswerDto['owner'] = {
        id: user_id,
      };
      let answer = await manager.create(Answer, createAnswerDto);
      /* add nested owner and question objects and save */
      answer = await addNestedOwnerToObj(answer, user_id);
      answer = await addNestedQuestionToObj(answer, question_id);
      return manager.save(answer);
    });
  }

  async update(req: any, id: number, updateAnswerDto: UpdateAnswerDto): Promise<any> {
    return this.manager.transaction(async (manager) => {
      /* verify user and question */
      const user_id = await verify(req);
      const user = await manager.findOne(User, user_id);
      if (!user) {
        throw new UnauthorizedException();
      }
      let answer = await manager.findOne(Answer, id, { relations: ['owner', 'question'] });
      if (!answer) {
        throw new NotFoundException(`Answer '${id}' not found.`);
      }
      if (user.id !== answer.owner.id) {
        throw new BadRequestException(`You cannot update another user's answer.`);
      }
      /* add nested owner and question objects */
      answer = await addNestedOwnerToObj(answer, user_id);
      const question = answer.question;
      answer = await addNestedQuestionToObj(answer, question.id);
      /* update text and save */
      const text = updateAnswerDto.text;
      if (!text) {
        return answer;
      }
      answer.text = text;
      return manager.save(answer);
    });
  }

  async remove(req: any, id: number): Promise<any> {
    return this.manager.transaction(async (manager) => {
      /* verify user and answer */
      const user_id = await verify(req);
      const user = await manager.findOne(User, user_id);
      if (!user) {
        throw new UnauthorizedException();
      }
      const answer = await manager.findOne(Answer, id, { relations: ['owner'] });
      if (!answer) {
        throw new NotFoundException(`Answer '${id}' not found.`);
      }
      if (user.id !== answer.owner.id) {
        throw new BadRequestException(
          `You cannot delete another user's answer.`,
        );
      }
      /* delete answer */
      return manager.delete(Answer, id);
    });
  }
}
