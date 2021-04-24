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

@Injectable()
export class QuestionService {
  constructor(@InjectEntityManager() private manager: EntityManager) {}

  async create(req, createQuestionDto: CreateQuestionDto): Promise<Question> {
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
    return this.manager.transaction(async (manager) => {
      if (decoded['sub'] !== createQuestionDto.owner.id) {
        throw new BadRequestException(
          'You cannot post a question on behalf of another user.',
        );
      }
      const owner = await manager.findOne(User, createQuestionDto['owner']['id']);
      if (!owner) {
        throw new BadRequestException(`You are not a valid user.`);
      }
      const question = await manager.create(Question, createQuestionDto);
      question.owner = owner;
      return manager.save(question);
    });
  }

  async findAll(params): Promise<Question[]> {
    const res = await this.manager.find(Question, { relations: ['owner'] });
    return this.paginate(res, params);
  }

  async findOne(id: number): Promise<Question> {
    const question = await this.manager.findOne(Question, id, {
      relations: ['owner'],
    });
    if (!question) {
      throw new NotFoundException(`Question '${id}' not found.`);
    }
    return question;
  }

  update(id: number, updateQuestionDto: UpdateQuestionDto) {
    return `This action updates a #${id} question`;
  }

  remove(id: number) {
    return `This action removes a #${id} question`;
  }

  async findByUser(id: number, params): Promise<any> {
    const res = await this.manager.find(Question, { relations: ['owner'] });
    return this.paginate(res, params);
  }

  paginate(res, params): Promise<Question[]> {
    if (!res.length) {
      return res;
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
}
