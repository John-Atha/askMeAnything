import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { daysComplete, monthlyCountsParseInt } from '../../general-methods/methods';
import { EntityManager } from 'typeorm';
import { getQuestionsStatsDaily, getQuestionsStatsMonthly } from 'async_calls/async_calls';

@Injectable()
export class QuestionService {
  constructor(@InjectEntityManager() private manager: EntityManager) {}

  async findStatsMonthly(): Promise<any> {
    /*const data = await this.manager.query(
      `SELECT to_char(public."question"."created_at", 'YYYY-MM') as month,
                      COUNT(*) as questions
               FROM public."question"
               GROUP BY month`,
    );*/
    const data = await getQuestionsStatsMonthly();
    return monthlyCountsParseInt(data.data, 'questions');
  }

  async findStatsDaily(): Promise<any> {
    /*const data = await this.manager.query(
      `SELECT to_char(public."question"."created_at", 'FMDay') as day,
                    COUNT(*) as questions
              FROM public."question"
              GROUP BY day`,
    );*/
    const data = await getQuestionsStatsDaily();
    return daysComplete(data.data, 'questions');
  }
}
