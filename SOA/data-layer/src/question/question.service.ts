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

  async findQuestionsAnswers(id: number, params): Promise<Answer[]> {
    const question = await this.manager.findOne(Question, id, { relations: ['answers', 'answers.owner'] });
    if (!question) {
      throw new NotFoundException(`Question ${id} not found.`);
    }
    let answers = await this.withCountAnswersUpvotes(question.answers);
    answers = answers.sort((a, b) =>
      a['upvotesCount'] < b['upvotesCount'] ? 1 : -1,
    );
    //const answers = paginate(question.answers, params);
    //return this.withCountAnswersUpvotes(answers);
    return paginate(answers, params);
  }

  async withCountQuestionsUpvotes(questions): Promise<any> {
    for (let i = 0; i < questions.length; i++) {
      const count = await this.manager.query(
        `SELECT COUNT(*) FROM public."question_upvote" WHERE public."question_upvote"."questionId"=${questions[i].id}`,
      );
      questions[i]['upvotesCount'] = await parseInt(count[0]['count']);
    }
    return questions;
  }

  async withCountAnswersUpvotes(answers): Promise<any> {
    for (let i = 0; i < answers.length; i++) {
      const count = await this.manager.query(
        `SELECT COUNT(*) FROM public."answer_upvote" WHERE public."answer_upvote"."answerId"=${answers[i].id}`,
      );
      answers[i]['upvotesCount'] = await parseInt(count[0]['count']);
    };
    return answers;
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

  async attachKeyword(req, question_id: number, keyword_id: number) {
    return this.manager.transaction(async (manager) => {
      const user_id = verify(req);
      const user = await manager.findOne(User, user_id);
      if (!user) {
        throw new UnauthorizedException();
      }
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
      if (!user) {
        throw new UnauthorizedException();
      }
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
      const user = await manager.findOne(User, user_id);
      if (!user) {
        throw new UnauthorizedException();
      }
      const question = await manager.findOne(Question, id);
      if (!question) {
        throw new NotFoundException(`Question ${id} not found.`);
      }
      const upvote = await manager.find(QuestionUpvote, { owner: user, question: question });
      if (!upvote.length) {
        return {
          upvoted: false,
        };
      }
      return {
        upvoted: true,
        id: upvote[0].id,
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
