import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { paginate, verify, addNestedOwnerToObj } from '../../general_methods/methods';

import { Question } from '../question/entities/question.entity';
import { User } from '../user/entities/user.entity';
import { QuestionUpvote } from '../question-upvote/entities/question-upvote.entity';
import { Keyword } from '../keyword/entities/keyword.entity';
import { choreoPost } from 'async_calls/async_calls';

@Injectable()
export class QuestionService {
  constructor(@InjectEntityManager() private manager: EntityManager) {}

  async create(req: any, createQuestionDto: CreateQuestionDto): Promise<any> {
    return this.manager.transaction(async (manager) => {
      /* validate input */
      const user_id = await verify(req);
      console.log(`I see user ${user_id}`);
      const allowed = await this.validateCreate(createQuestionDto.title);
      if (!allowed) {
        throw new BadRequestException('Title already exists.');
      }
      const owner = await manager.findOne(User, user_id);
      if (!owner) {
        throw new UnauthorizedException();
      }
      /* save object */
      createQuestionDto['owner'] = {
        id: user_id,
      };
      const question = await manager.create(Question, createQuestionDto);
      question.owner = owner;
      const newQuest = await manager.save(question);
      /* SEND IT TO THE CHOREOGRAPHER */
      choreoPost('post', newQuest, -1, 'question')
      .then(response => {
        console.log(response.data);
      })
      .catch(err => {
        console.log(err);
      })
      /* add nested owner json */
      return addNestedOwnerToObj(newQuest, user_id);
    });
  }

  async findOne(id: number): Promise<any> {
    const question = await this.manager.findOne(Question, id, {
      relations: ['owner', 'upvotes'],
    });
    if (!question) {
      throw new NotFoundException(`Question '${id}' not found.`);
    }
    const count = await this.manager.query(
      `SELECT COUNT(*) FROM public."question_upvote" WHERE public."question_upvote"."questionId"=${id}`,
    );
    question['upvotesCount'] = await parseInt(count[0]['count']);
    return addNestedOwnerToObj(question, question.owner.id);
  }

  async countUpvotes(id: number): Promise<any> {
    const question = await this.manager.findOne(Question, id);
    if (!question) {
      throw new NotFoundException(`Question '${id}' not found.`);
    }
    let count = await this.manager.query(
      `SELECT COUNT(*) FROM public."question_upvote" WHERE public."question_upvote"."questionId"=${id}`,
    );
    count = await parseInt(count[0]['count']);
    return { upvotes: count };
  }

  async update(req: any, id: number, updateQuestionDto: UpdateQuestionDto): Promise<any> {
    return this.manager.transaction(async (manager) => {
      const user_id = await verify(req);
      const allowed = await this.validateUpdate(id, updateQuestionDto.title);
      if (!allowed) {
        throw new BadRequestException('Title already exists.');
      }
      const question = await manager.findOne(Question, id, {
        relations: ['owner'],
      });
      if (!question) {
        throw new NotFoundException(`Question ${id} not found.`);
      }
      console.log(question);
      if (question.owner.id !== user_id) {
        throw new BadRequestException(
          "You cannot update another user's question",
        );
      }
      manager.merge(Question, question, updateQuestionDto);
      const newQuest = await manager.save(question);
      /* SEND IT TO THE CHOREOGRAPHER */
      choreoPost('patch', newQuest, id, 'question')
      .then(response => {
        console.log(response.data);
      })
      .catch(err => {
        console.log(err);
      })
      return addNestedOwnerToObj(newQuest, user_id);
    });
  }

  async remove(req: any, id: number): Promise<any> {
    return this.manager.transaction(async (manager) => {
      const user_id = await verify(req);
      const question = await manager.findOne(Question, id, {
        relations: ['owner'],
      });
      if (!question) {
        throw new NotFoundException(`Question ${id} not found.`);
      }
      if (question.owner.id !== user_id) {
        throw new BadRequestException(
          "You cannot delete another user's question.",
        );
      }
      const res = await manager.delete(Question, id);
      /* SEND IT TO THE CHOREOGRAPHER */
      choreoPost('delete', { id }, id, 'question')
      .then(response => {
        console.log(response.data);
      })
      .catch(err => {
        console.log(err);
      })
      return res;
    });
  }

  async findUpvotes(id: number, reqParams: any): Promise<QuestionUpvote[]> {
    const question = await this.manager.findOne(Question, id, { relations: ['upvotes', 'upvotes.owner'] });
    if (!question) {
      throw new NotFoundException(`Question ${id} not found.`);
    }
    for (let i=0; i<question.upvotes.length; i++) {
      const upvote = question.upvotes[i];
      const owner_id = upvote.owner.id;
      question.upvotes[i] = await addNestedOwnerToObj(upvote, owner_id);
    }
    return paginate(question.upvotes, reqParams);
  }

  async isUpvoted(req: any, id: number): Promise<any> {
    return this.manager.transaction(async (manager) => {
      const user_id = await verify(req);
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

  async findKeywords(id: number): Promise<any> {
    const question = await this.manager.findOne(Question, id, { relations: ['keywords'] });
    if (!question) {
      throw new NotFoundException(`Question '${id}' not found.`);
    }
    return question.keywords;
  }

  async attachKeyword(req: any, question_id: number, keyword_id: number) {
    return this.manager.transaction(async (manager) => {
      /* validate user, question, keyword */
      const user_id = await verify(req);
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
      /* add it if not already in */
      const old_keywords = question.keywords;
      console.log(old_keywords);
      console.log(keyword);
      let already_in = false;
      for (let i=0; i<old_keywords.length; i++) {
        if (old_keywords[i].id===keyword.id) {
          already_in = true;
        }
      }
      if (!already_in) {
        console.log('New, I am adding it.');
        old_keywords.push(keyword);
      }
      question.keywords = old_keywords;
      /* save question */
      const newQuest = await manager.save(question);
      /* SEND IT TO THE CHOREOGRAPHER */
      choreoPost('patch', old_keywords, question_id, 'question-keywords')
      .then(response => {
        console.log(response.data);
      })
      .catch(err => {
        console.log(err);
      })
      return addNestedOwnerToObj(newQuest, user_id);
    });
  }

  async detachKeyword(req: any, question_id: number, keyword_id: number) {
    return this.manager.transaction(async (manager) => {
      const user_id = await verify(req);
      const user = await manager.findOne(User, user_id);
      if (!user) {
        throw new UnauthorizedException();
      }
      const question = await manager.findOne(Question, question_id, { relations: ['owner', 'keywords'] });
      if (!question) {
        throw new NotFoundException(`Question '${question_id} not found.`);
      }
      if (question.owner.id !== user_id) {
        console.log(question.owner.id);
        console.log(user_id);  
        throw new BadRequestException(`Only the question's owner can modify it.`);
      }
      const keyword = await manager.findOne(Keyword, keyword_id);
      if (!keyword) {
        throw new NotFoundException(`Keyword '${keyword_id} not found.`);
      }
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
        const newQuestion = await this.manager.save(question);
        /* SEND IT TO THE CHOREOGRAPHER */
        choreoPost('patch', question.keywords, question_id, 'question-keywords')
        .then(response => {
          console.log(response.data);
        })
        .catch(err => {
          console.log(err);
        })
        return addNestedOwnerToObj(newQuestion, user_id);
      }
      else {
        throw new BadRequestException(
          `Keyword '${keyword_id}' not in question '${question_id}'`,
        );
      }
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
