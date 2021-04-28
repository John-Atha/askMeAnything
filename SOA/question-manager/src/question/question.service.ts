import {
  BadRequestException,
  HttpService,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { Question } from './entities/question.entity';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
const jwt = require('jsonwebtoken');
import { jwtConstants } from '../constants';
import { User } from '../user/entities/user.entity';
import { Answer } from '../answer/entities/answer.entity';

@Injectable()
export class QuestionService {
  constructor(@InjectEntityManager() private manager: EntityManager) {}

  async create(req, createQuestionDto: CreateQuestionDto): Promise<Question> {
    const user_id = this.verify(req);
    const allowed = await this.validateCreate(createQuestionDto.title);
    if (!allowed) {
      throw new BadRequestException('Title already exists.');
    }
    return this.manager.transaction(async (manager) => {
      const owner = await manager.findOne(User, user_id);
      if (!owner) {
        throw new BadRequestException(`You are not a valid user.`);
      }
      createQuestionDto['owner'] = {
        id: user_id,
      };
      const question = await manager.create(Question, createQuestionDto);
      question.owner = owner;
      return manager.save(question);
    });
  }

  async findAll(params): Promise<any> {
    let res = [];
    res = await this.manager.find(Question, { relations: ['owner', 'upvotes'] });
    res = this.paginate(res, params);
    return this.withCountQuestionsUpvotes(res);
  }

  async findOne(id: number): Promise<any> {
    let question = null;
    question = await this.manager.findOne(Question, id, {
      relations: ['owner', 'upvotes'],
    });
    if (!question) {
      throw new NotFoundException(`Question '${id}' not found.`);
    }
    question['upvotes'] = question['upvotes'].length;
    return question;
  }

  async update(req, id: number, updateQuestionDto: UpdateQuestionDto): Promise<Question> {
    const user_id = this.verify(req);
    const allowed = await this.validateUpdate(id, updateQuestionDto.title);
    if (!allowed) {
      throw new BadRequestException('Title already exists.');
    }
    return this.manager.transaction(async (manager) => {
      const question = await manager.findOne(Question, id, {
        relations: ['owner'],
      });
      if (!question) {
        throw new NotFoundException(`Question ${id} not found.`);
      }
      if (question.owner.id !== user_id) {
        throw new BadRequestException(
          "You cannot update another user's question",
        );
      }
      manager.merge(Question, question, updateQuestionDto);
      return manager.save(question);
    });
  }

  async remove(req, id: number): Promise<void> {
    const user_id = this.verify(req);
    return this.manager.transaction(async (manager) => {
      const question = await manager.findOne(Question, id, { relations: ['owner'] });
      if (!question) {
        throw new NotFoundException(`Question ${id} not found.`);
      }
      if (question.owner.id !== user_id) {
        throw new BadRequestException(
          "You cannot delete another user's question.",
        );
      }
      await manager.delete(Question, id);
    });
  }

  async findByUser(id: number, params): Promise<any> {
    let res = [];
    res = await this.manager.find(Question, { relations: ['owner', 'upvotes'] });
    res = res.filter((question) => {
      return question.owner.id === id;
    });
    res = this.paginate(res, params);
    return this.withCountQuestionsUpvotes(res);
  }

  async findAnswers(id: number, params): Promise<Answer[]> {
    const question = await this.manager.findOne(Question, id);
    if (!question) {
      throw new NotFoundException(`Question ${id} not found.`);
    }
    const res = await this.manager.find(Answer, { question: question });
    return this.paginate(res, params);
  }

  withCountQuestionsUpvotes(questions): any {
    for (let i = 0; i < questions.length; i++) {
      questions[i]['upvotes'] = questions[i]['upvotes'].length;
    }
    return questions;
  }

  validateParams(params): void {
    if (params.start !== undefined) {
      if (!parseInt(params.start)) {
        throw new BadRequestException(`Invalid start parameter.`);
      }
    }
    if (params.end !== undefined) {
      if (!parseInt(params.end)) {
        throw new BadRequestException(`Invalid end parameter.`);
      }
    }
  }

  paginate(res, params): any {
    this.validateParams(params);
    if (!res.length) {
      return res;
    }
    if (params.start > res.length) {
      return [];
    }
    const start = parseInt(params.start) - 1 || 0;
    const end =
      parseInt(params.end) || (parseInt(params.end) === 0 ? 0 : res.length);
    console.log(`start: ${start}`);
    console.log(`end: ${end}`);
    if (start >= end || start <= -1 || end === 0) {
      throw new BadRequestException('Invalid parameters');
    }
    return res.slice(start, end);
  }

  verify(req): number {
    const headers = req['rawHeaders'];
    let token = '';
    headers.forEach((header) => {
      if (header.startsWith('Bearer')) {
        token = header.slice(7);
      }
    });
    let decoded = {};
    try {
      decoded = jwt.verify(token, jwtConstants.secret);
    } catch (error) {
      console.log(error);
      throw new UnauthorizedException();
    }
    return decoded['sub'];
  }

  async validateCreate(title: string): Promise<boolean> {
    const res = await this.manager.find(Question, { title: title });
    return !res;
  }

  async validateUpdate(id: number, title: string): Promise<boolean> {
    const res = await this.manager.findOne(Question, { title: title });
    return !res || (res && res['id'] === id);
  }
}
