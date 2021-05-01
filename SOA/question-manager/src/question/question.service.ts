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
import { paginate, verify } from '../../general-methods/methods';

@Injectable()
export class QuestionService {
  constructor(@InjectEntityManager() private manager: EntityManager) {}

  async create(req, createQuestionDto: CreateQuestionDto): Promise<Question> {
    const user_id = verify(req);
    const allowed = await this.validateCreate(createQuestionDto.title);
    if (!allowed) {
      throw new BadRequestException('Title already exists.');
    }
    return this.manager.transaction(async (manager) => {
      const owner = await manager.findOne(User, user_id);
      if (!owner) {
        throw new UnauthorizedException();
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
    res = await this.manager.find(Question, { relations: ['owner'] });
    res = paginate(res, params);
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
    const count = await this.manager.query(
      `SELECT COUNT(*) FROM public."question_upvote" WHERE public."question_upvote"."questionId"=${id}`,
    );
    question['upvotes'] = await parseInt(count[0]['count']);
    return question;
  }

  async update(req, id: number, updateQuestionDto: UpdateQuestionDto): Promise<Question> {
    const user_id = verify(req);
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

  async remove(req, id: number): Promise<any> {
    const user_id = verify(req);
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
      return manager.delete(Question, id);
    });
  }

  async findByUser(id: number, params): Promise<any> {
    let res = [];
    res = await this.manager.find(Question, { relations: ['owner', 'upvotes'] });
    res = res.filter((question) => {
      return question.owner.id === id;
    });
    res = paginate(res, params);
    return this.withCountQuestionsUpvotes(res);
  }

  async findQuestionsAnswers(id: number, params): Promise<Answer[]> {
    const question = await this.manager.findOne(Question, id);
    if (!question) {
      throw new NotFoundException(`Question ${id} not found.`);
    }
    let res = await this.manager.find(Answer, { relations: ['owner', 'question'] });
    res = res.filter((answer) => {
      return answer.question.id === id;
    })
    res = paginate(res, params);
    return this.withCountAnswersUpvotes(res);
  }

  async withCountQuestionsUpvotes(questions): Promise<any> {
    for (let i = 0; i < questions.length; i++) {
      const count = await this.manager.query(
        `SELECT COUNT(*) FROM public."question_upvote" WHERE public."question_upvote"."questionId"=${questions[i].id}`,
      );
      questions[i]['upvotes'] = await parseInt(count[0]['count']);
    }
    return questions;
  }

  async withCountAnswersUpvotes(answers): Promise<any> {
    for (let i = 0; i < answers.length; i++) {
      const count = await this.manager.query(
        `SELECT COUNT(*) FROM public."answer_upvote" WHERE public."answer_upvote"."answerId"=${answers[i].id}`,
      );
      answers[i]['upvotes'] = await parseInt(count[0]['count']);
    };
    return answers;
  }

  async findUpvotes(id: number, params): Promise<QuestionUpvote> {
    const question = await this.manager.findOne(Question, id);
    if (!question) {
      throw new NotFoundException(`Question ${id} not found.`);
    }
    let res = await this.manager.find(QuestionUpvote, { relations: ['owner', 'question'] });
    res = res.filter((upvote) => {
      return upvote.question.id === question.id;
    });
    return paginate(res, params);
  }

  async findKeywords(id: number): Promise<Keyword[]> {
    const question = await this.manager.findOne(Question, id, { relations: ['keywords'] });
    if (!question) {
      throw new NotFoundException(`Question '${id}' not found.`);
    }
    return question['keywords'];
  }

  async attachKeyword(req, question_id: number, keyword_id: number) {
    return this.manager.transaction(async (manager) => {
      const user_id = verify(req);
      const user = await manager.findOne(User, user_id);
      const question = await manager.findOne(Question, question_id, { relations: ['owner', 'keywords'] });
      if (!question) {
        throw new NotFoundException(`Question '${question_id} not found.`);
      }
      if (question.owner.id !== user.id) {
        console.log(question.owner);
        console.log(user);
        throw new BadRequestException(`Only the question's owner can modify it.`);
      }
      const keyword = await manager.findOne(Keyword, keyword_id);
      if (!keyword) {
        throw new NotFoundException(`Keyword '${keyword_id} not found.`);
      }
      const old_keywords = question.keywords;
      old_keywords.push(keyword);
      question.keywords = old_keywords;
      return manager.save(question);
    });
  }

  async detachKeyword(req, question_id: number, keyword_id: number) {
    return this.manager.transaction(async (manager) => {
      const user_id = verify(req);
      const user = await manager.findOne(User, user_id);
      const question = await manager.findOne(Question, question_id, { relations: ['owner', 'keywords'] });
      if (!question) {
        throw new NotFoundException(`Question ${question_id} not found.`);
      }
      if (question.owner.id !== user.id) {
        throw new BadRequestException(`Only the question's owner can modify it.`);
      }
      const keyword = await manager.findOne(Keyword, keyword_id);
      const keywordsIds = [];
      question.keywords.forEach((word) => {
        keywordsIds.push(word.id);
      });
      let index = -1;
      for (let i = 0; i < question.keywords.length; i++) {
        if (question.keywords[i].id === keyword.id) {
          index = i;
          break;
        }
      }
      if (index !== -1) {
        question.keywords = question.keywords
          .slice(0, index)
          .concat(question.keywords.slice(index + 1, question.keywords.length));
        return this.manager.save(question);
      }
      else {
        throw new BadRequestException(
          `Keyword '${keyword_id}' not in question '${question_id}'`,
        );
      }
    });
  }

  async isUpvoted(req, id: number): Promise<any> {
    return this.manager.transaction(async (manager) => {
      const user_id = verify(req);
      const question = await manager.findOne(Question, id, { relations: ['upvotes', 'owner'] });
      if (!question) {
        throw new NotFoundException(`Question ${id} not found.`);
      }
      const upvotes = question.upvotes;
      for (let i = 0; i < upvotes.length; i++) {
        console.log(upvotes[i]);
        const upvoteId = upvotes[i].id;
        const upvote = await this.manager.findOne(QuestionUpvote, upvoteId, { relations: ['owner'] } );
        if (upvote) {
          if (upvote.owner.id === user_id) {
            return {
              upvoted: true,
            };
          }
        }
      }
      console.log(upvotes);
      return {
        upvoted: false,
      };
    });
  }

  async validateCreate(title: string): Promise<boolean> {
    const res = await this.manager.find(Question, { title: title });
    return !res.length;
  }

  async validateUpdate(id: number, title: string): Promise<boolean> {
    const res = await this.manager.findOne(Question, { title: title });
    return !res || (res && res['id'] === id);
  }
}
