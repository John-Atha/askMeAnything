import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { Question } from './entities/question.entity';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { User } from '../user/entities/user.entity';
import { Answer } from '../answer/entities/answer.entity';
import { QuestionUpvote } from '../question-upvote/entities/question-upvote.entity';
import { Keyword } from '../keyword/entities/keyword.entity';
import { paginate, verify } from '../../general_methods/methods';

@Injectable()
export class QuestionService {
  constructor(@InjectEntityManager() private manager: EntityManager) {}

  async create(body: any): Promise<Question> {
    console.log('createquestiondto:');
    console.log(body.createQuestionDto);
    console.log('owner:');
    console.log(body.owner);
    return this.manager.transaction(async (manager) => {
      const question = await manager.create(Question, body.createQuestionDto);
      question.owner = body.owner;
      console.log(question);
      return manager.save(question);
    });
  }

  async findOne(params): Promise<any> {
    let question = null;
    let relations = [ ]
    if (params.owner) relations.push('owner');
    if (params.answers) relations.push('answers');
    if (params.upvotes) relations.push('upvotes');
    if (params.keywords) relations.push('keywords');
    if (params.answersOwner) relations.push('answers.owner');
    if (params.upvotesOwner) relations.push('upvotes.owner');
    if (params.id) {
      question = await this.manager.findOne(Question, params.id, { relations });
    }
    else if (params.title) {
      question = await this.manager.findOne(Question, {title: params.title}, { relations });
    }
    /*question = await this.manager.findOne(Question, id, {
      relations: ['owner', 'upvotes'],
    });
    if (!question) {
      throw new NotFoundException(`Question not found.`);
    }*/
    if (question && params.id) {
      const count = await this.manager.query(
        `SELECT COUNT(*) FROM public."question_upvote" WHERE public."question_upvote"."questionId"=${params.id}`,
      );
      question['upvotesCount'] = await parseInt(count[0]['count']);  
    }
    return question;
  }

  async find(params: any): Promise<Question[]> {
    let relations = [];
    if (params.owner) relations.push('owner');
    const questions = await this.manager.find(Question, { relations });
    return questions;
  }

  async update(id: number, updateQuestionDto: UpdateQuestionDto): Promise<Question> {
    return this.manager.transaction(async (manager) => {
      const question = await manager.findOne(Question, id);
      manager.merge(Question, question, updateQuestionDto);
      return manager.save(question);
    });
  }

  async remove(id: number): Promise<any> {
    return this.manager.delete(Question, id);
  }

  async AnswerCountUpvotes(id: number): Promise<any> {
    return this.manager.query(
      `SELECT COUNT(*) FROM public."answer_upvote" WHERE public."answer_upvote"."answerId"=${id}`,
    );
  }

  async findUpvotes(id: number, params): Promise<QuestionUpvote> {
    const question = await this.manager.findOne(Question, id, { relations: ['upvotes', 'upvotes.owner'] });
    if (!question) {
      throw new NotFoundException(`Question ${id} not found.`);
    }
    return paginate(question.upvotes, params);
  }

  async findKeywords(id: number): Promise<Keyword[]> {
    const question = await this.manager.findOne(Question, id, { relations: ['keywords'] });
    if (!question) {
      throw new NotFoundException(`Question '${id}' not found.`);
    }
    return question.keywords;
  }

  async updKeywords(question_id: number, keywords: any) {
    return this.manager.transaction(async (manager) => {
      const question = await manager.findOne(Question, question_id, { relations: ['owner', 'keywords'] });
      question.keywords = keywords;
      return manager.save(question);
    });
  }

  async isUpvoted(user_id: number, quest_id: number): Promise<any> {
    return this.manager.transaction(async (manager) => {
      const user = await manager.findOne(User, user_id);
      const question = await manager.findOne(Question, quest_id);
      return manager.find(QuestionUpvote, { owner: user, question: question });
    });
  }

  async questionsCountUpvotes(body: any): Promise<any> {
    console.log('body');
    console.log(body);
    const questions = body.questions;
    for (let i = 0; i < questions.length; i++) {
      const count = await this.manager.query(
        `SELECT COUNT(*) FROM public."question_upvote" WHERE public."question_upvote"."questionId"=${questions[i].id}`,
      );
      questions[i]['upvotesCount'] = await parseInt(count[0]['count']);
    }
    return questions;
  }

  async validateCreate(title: string): Promise<boolean> {
    const res = await this.manager.find(Question, { title: title });
    return !res.length;
  }

  async validateUpdate(id: number, title: string): Promise<boolean> {
    const res = await this.manager.findOne(Question, { title: title });
    return !res || (res && res['id'] === id);
  }

  async findStatsMonthly(): Promise<any> {
    return this.manager.query(
      `SELECT to_char(public."question"."created_at", 'YYYY-MM') as month,
                      COUNT(*) as questions
               FROM public."question"
               GROUP BY month`,
    );
  }
  async findStatsDaily(): Promise<any> {
    return this.manager.query(
      `SELECT to_char(public."question"."created_at", 'FMDay') as day,
                    COUNT(*) as questions
              FROM public."question"
              GROUP BY day`,
    );
  }
}
