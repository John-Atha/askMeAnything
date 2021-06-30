import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { paginate, daysComplete, monthlyCountsParseInt } from '../../general-methods/methods';
import { countQuestionsUpvotes, getOneKeyword, getKeywordStatsDaily, getKeywordStatsMonthly } from 'async_calls/async_calls';

@Injectable()
export class KeywordService {
  constructor(@InjectEntityManager() private manager: EntityManager) {}

  async findQuestionsMonthly(params, id, year, month): Promise<any> {
    return this.manager.transaction(async (manager) => {
      /*const keyword = await manager.findOne(Keyword, id, {
        relations: ['questions', 'questions.owner'],
      });*/
      const query_params = {
        id,
        questions: true,
        questionsOwner: true,
      }
      const keyword = await getOneKeyword(query_params);
      if (!keyword.data) {
        throw new NotFoundException(`Keyword '${id}' not found.`);
      }
      let questions = keyword.data.questions;
      questions = questions.filter((question) => {
        const date = new Date(question.updated_at);
        return (
          date.getFullYear() === year &&
          date.getMonth() === month
        );
      });
      questions = paginate(questions, params);
      //return withCountQuestionsUpvotes(questions, manager);
      questions = await countQuestionsUpvotes(questions);
      return questions.data;
    });
  }

  async findAll(
    params: any,
    id: number,
    year: number,
    month: number
  ): Promise<any> {
    return this.manager.transaction(async (manager) => {
      /*const keyword = await manager.findOne(Keyword, id, {
        relations: ['questions', 'questions.owner'],
      });*/
      const query_params = {
        id,
        questions: true,
        questionsOwner: true,
      };
      const keyword = await getOneKeyword(query_params);
      if (!keyword.data) {
        throw new NotFoundException(`Keyword '${id}' not found.`);
      }
      let questions = keyword.data.questions;
      if (year && month) {
        questions = questions.filter((question) => {
          const date = new Date(question.updated_at);
          return (
            date.getFullYear() === year &&
            date.getMonth() === month
          );
        });  
      }
      else if (year && !month) {
        questions = questions.filter((question) => {
          const date = new Date(question.updated_at);
          return (
            date.getFullYear() === year
          );
        });
      }
      questions = paginate(questions, params);
      //return withCountQuestionsUpvotes(questions, manager);
      questions = await countQuestionsUpvotes(questions);
      return questions.data;
    });
  }

  async findStatsMonthly(id: number): Promise<any> {
    return this.manager.transaction(async (manager) => {
      //const keyword = await manager.findOne(Keyword, id);
      const keyword = await getOneKeyword({ id });
      if (!keyword.data) {
        throw new NotFoundException(`Keyword '${id}' not found.`);
      }
      /*const data = await manager.query(
        `SELECT to_char(public."question"."created_at", 'YYYY-MM') as month,
                      COUNT(*) as questions
               FROM public."question", public."question_keywords_keyword" 
               WHERE public."question_keywords_keyword"."keywordId"=${id}
                 AND public."question_keywords_keyword"."questionId"=public."question"."id"
               GROUP BY month`,
      );*/
      const data = await getKeywordStatsMonthly(id);
      return monthlyCountsParseInt(data.data, 'questions');
    });
  }

  async findStatsDaily(id: number) {
    return this.manager.transaction(async (manager) => {
      //const keyword = await manager.findOne(Keyword, id);
      const keyword = await getOneKeyword({ id });
      if (!keyword.data) {
        throw new NotFoundException(`Keyword '${id}' not found.`);
      }
      /*const data = await manager.query(
        `SELECT to_char(public."question"."created_at", 'FMDay') as day,
                      COUNT(*) as questions
               FROM public."question", public."question_keywords_keyword" 
               WHERE public."question_keywords_keyword"."keywordId"=${id}
                 AND public."question_keywords_keyword"."questionId"=public."question"."id"
               GROUP BY day`,
      );*/
      const data = await getKeywordStatsDaily(id);
      return daysComplete(data.data, 'questions');
    });
  }

}