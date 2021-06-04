import {Injectable, NotFoundException} from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { daysComplete, monthlyCountsParseInt } from '../../general-methods/methods';
import { EntityManager } from 'typeorm';
import { getKeywordStatsDaily, getKeywordStatsMonthly, getOneKeyword } from 'async_calls/async_calls';

@Injectable()
export class KeywordService {
  constructor(@InjectEntityManager() private manager: EntityManager) {}

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
