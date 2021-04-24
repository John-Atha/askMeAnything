import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { Question } from "./entities/question.entity";
import { InjectEntityManager } from "@nestjs/typeorm";
import { EntityManager } from "typeorm";

@Injectable()
export class QuestionService {
  constructor(@InjectEntityManager() private manager: EntityManager) {}

  create(createQuestionDto: CreateQuestionDto) {
    return 'This action adds a new question';
  }

  async findAll(params): Promise<any> {
    let res = await this.manager.find(Question, { relations: ['owner'] });
    if (!res.length) {
      return res;
    }
    const start = parseInt(params.start)-1 || 0;
    const end = parseInt(params.end) || (parseInt(params.end) === 0 ? 0 : res.length);
    console.log(`start: ${start}`);
    console.log(`end: ${end}`);
    if (start >= end || start <= -1 || end === 0) {
      throw new BadRequestException('Invalid parameters');
    }
    res = res.slice(start, end);
    const safe_res = [];
    for (let i=0; i<res.length; i++) {
      const { password, ...safe_owner } = res[i]['owner'];
      safe_res[i] = res[i];
      safe_res[i]['owner'] = safe_owner;
    }
    return res;
  }

  async findOne(id: number): Promise<any> {
    const question = await this.manager.findOne(Question, id, { relations: ['owner'] });
    if (!question) {
      throw new NotFoundException(`Question '${id}' not found.`)
    }
    const { password, ...safe_owner} = question.owner;
    let safe_question = {};
    safe_question = question;
    safe_question['owner'] = safe_owner;
    return safe_question;
  }

  update(id: number, updateQuestionDto: UpdateQuestionDto) {
    return `This action updates a #${id} question`;
  }

  remove(id: number) {
    return `This action removes a #${id} question`;
  }

  async findByUser(id: number, reqParams): Promise<any> {
    let res = await this.manager.find(Question, { relations: ['owner'] });
    let safe_res = [];
    for (let i=0; i<res.length; i++) {
      if (res[i]['owner']['id']===id) {
        const { password, ...safe_owner } = res[i]['owner'];
        let safe_question = {};
        safe_question = res[i];
        safe_question['owner'] = safe_owner;
        safe_res.push(safe_question);
      }
    }    
    return safe_res;
  }
}
