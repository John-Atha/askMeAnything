import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { UpdateAnswerDto } from './dto/update-answer.dto';
import { verify } from '../../general-methods/methods';
import { createAnswer, getOneQuestion, getOneUser, getOneAnswer, updAnswerText, deleteAnswer } from 'async_calls/async_calls';

@Injectable()
export class AnswerService {
  constructor() {}

  async create(req, createAnswerDto: CreateAnswerDto): Promise<any> {
    const user_id = await verify(req);
    const question_id = createAnswerDto.question.id;
    const answer = await createAnswer(createAnswerDto, question_id, user_id);
    return answer.data;
  }

  async update(req: any, id: number, updateAnswerDto: UpdateAnswerDto): Promise<any> {
    const user_id = await verify(req);
    const params = {
      id,
      owner: true,
    }
    const answer = await getOneAnswer(params);
    if (!answer.data) {
      throw new NotFoundException(`Answer '${id}' not found.`);
    }
    if (user_id !== answer.data.owner.id) {
      throw new BadRequestException(`You cannot update another user's answer.`);
    }
    const text = updateAnswerDto.text;
    if (!text) {
      return answer.data;
    }
    const newAnswer = await updAnswerText(id, text);
    return newAnswer.data;
  }

  async remove(req: any, id: number): Promise<any> {
    const user_id = await verify(req);
    const answer = await getOneAnswer({ id, owner: true });
    if (!answer.data) {
      throw new NotFoundException(`Answer '${id}' not found.`);
    }
    if (user_id !== answer.data.owner.id) {
      throw new BadRequestException(
        `You cannot delete another user's answer.`,
      );
    }
    const res = await deleteAnswer(id);
    return res.data;
  }
}
