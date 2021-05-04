import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { Question } from '../question/entities/question.entity';
import { EntityManager } from 'typeorm';
import { Keyword } from './entities/keyword.entity';
import { paginate, withCountQuestionsUpvotes } from '../../general-methods/methods';

@Injectable()
export class KeywordService {
  constructor(@InjectEntityManager() private manager: EntityManager) {}

  async findQuestionsMonthly(params, id, year, month): Promise<Question[]> {
    return this.manager.transaction( async (manager) => {
      const keyword = await manager.findOne(Keyword, id, { relations: ['questions', 'questions.owner'] });
      if (!keyword) {
        throw new NotFoundException(`Keyword '${id}' not found.`);
      }
      const questions = paginate(keyword.questions, params);
      return withCountQuestionsUpvotes(questions, manager);
    })
  }

  async countQuestionsMonthly(id: number): Promise<any> {
    return this.manager.query(
      `SELECT DATE_TRUNC('month', public."question"."updated_at") as upd_month,
              COUNT(*)
       FROM public."question", public."question_keywords_keyword" 
       WHERE public."question_keywords_keyword"."keywordId"=${id}
         AND public."question_keywords_keyword"."questionId"=public."question"."id"
       GROUP BY upd_month`,      
    )
  }
}
