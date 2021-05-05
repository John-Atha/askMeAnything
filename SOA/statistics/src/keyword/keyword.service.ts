import {Injectable, NotFoundException} from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import {Keyword} from "./entities/keyword.entity";

@Injectable()
export class KeywordService {
  constructor(@InjectEntityManager() private manager: EntityManager) {}

  async findStatsMonthly(id: number): Promise<any> {
    return this.manager.transaction(async (manager) => {
      const keyword = await manager.findOne(Keyword, id);
      if (!keyword) {
        throw new NotFoundException(`Keyword '${id}' not found.`);
      }
      return manager.query(
        `SELECT DATE_TRUNC('month', public."question"."created_at") as month,
                      COUNT(*) as questions
               FROM public."question", public."question_keywords_keyword" 
               WHERE public."question_keywords_keyword"."keywordId"=${id}
                 AND public."question_keywords_keyword"."questionId"=public."question"."id"
               GROUP BY month`,
      );
    });
  }

  async findStatsDaily(id: number) {
    return this.manager.transaction(async (manager) => {
      const keyword = await manager.findOne(Keyword, id);
      if (!keyword) {
        throw new NotFoundException(`Keyword '${id}' not found.`);
      }
      return this.manager.query(
        `SELECT to_char(public."question"."created_at", 'FMDay') as day,
                      COUNT(*) as questions
               FROM public."question", public."question_keywords_keyword" 
               WHERE public."question_keywords_keyword"."keywordId"=${id}
                 AND public."question_keywords_keyword"."questionId"=public."question"."id"
               GROUP BY day`,
      );
    });
  }
}
