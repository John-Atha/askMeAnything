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
import { createAnswer, getOneQuestion, getOneUser, getOneAnswer, updAnswerText, deleteAnswer } from 'async_calls/async_calls';

@Injectable()
export class AnswerService {
  constructor(@InjectEntityManager() private manager: EntityManager) {}

  async create(req, createAnswerDto: CreateAnswerDto): Promise<any> {
    return this.manager.transaction(async (manager) => {
      const user_id = await verify(req);
      //const owner = await manager.findOne(User, user_id);
      const owner = await getOneUser({id: user_id});
      if (!owner.data) {
        throw new UnauthorizedException();
      }
      const question_id = createAnswerDto.question.id;
      //const question = await manager.findOne(Question, question_id);
      const question = await getOneQuestion({ id: question_id });
      if (!question.data) {
        throw new NotFoundException(`Question '${question_id}' not found.`);
      }
      /*createAnswerDto['owner'] = {
        id: user_id,
      };
      const answer = await manager.create(Answer, createAnswerDto);
      answer.owner = owner;Answer
      answer.question = question;
      return manager.save(answer);*/
      const answer = await createAnswer(createAnswerDto, question_id, user_id);
      return answer.data;
    });
  }

  async update(req: any, id: number, updateAnswerDto: UpdateAnswerDto): Promise<any> {
    return this.manager.transaction(async (manager) => {
      const user_id = await verify(req);
      //const user = await manager.findOne(User, user_id);
      const user = await getOneUser({ id: user_id });
      if (!user.data) {
        throw new UnauthorizedException();
      }
      //const answer = await manager.findOne(Answer, id, { relations: ['owner'] });
      const params = {
        id,
        owner: true,
      }
      const answer = await getOneAnswer(params);
      if (!answer.data) {
        throw new NotFoundException(`Answer '${id}' not found.`);
      }
      if (user.data.id !== answer.data.owner.id) {
        throw new BadRequestException(`You cannot update another user's answer.`);
      }
      const text = updateAnswerDto.text;
      if (!text) {
        return answer;
      }
      /*answer.data.text = text;
      return manager.save(answer);*/
      const newAnswer = await updAnswerText(id, text);
      return newAnswer.data;
    });
  }

  async remove(req: any, id: number): Promise<any> {
    return this.manager.transaction(async (manager) => {
      const user_id = await verify(req);
      //const user = await manager.findOne(User, user_id);
      const user = await getOneUser({ id: user_id });
      if (!user.data) {
        throw new UnauthorizedException();
      }
      //const answer = await manager.findOne(Answer, id, { relations: ['owner'] });
      const answer = await getOneAnswer({ id, owner: true });
      if (!answer.data) {
        throw new NotFoundException(`Answer '${id}' not found.`);
      }
      if (user.data.id !== answer.data.owner.id) {
        throw new BadRequestException(
          `You cannot delete another user's answer.`,
        );
      }
      //return manager.delete(Answer, id);
      const res = await deleteAnswer(id);
      return res.data;
    });
  }
}
