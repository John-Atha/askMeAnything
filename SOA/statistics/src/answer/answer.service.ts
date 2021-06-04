import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { daysComplete, monthlyCountsParseInt } from '../../general-methods/methods';
import { EntityManager } from 'typeorm';
import { getAnswersStatsDaily, getAnswersStatsMonthly } from 'async_calls/async_calls';

@Injectable()
export class AnswerService {
  constructor(@InjectEntityManager() private manager: EntityManager) {}

  async findStatsMonthly(): Promise<any> {
    /*const data = await this.manager.query(
      `SELECT to_char(public."answer"."created_at", 'YYYY-MM') as month,
                    COUNT(*) as answers
               FROM public."answer"
               GROUP BY month`,
    );*/
    const data = await getAnswersStatsMonthly();
    return monthlyCountsParseInt(data.data, 'answers');
  }

  async findStatsDaily(): Promise<any> {
    /*const data = await this.manager.query(
      `SELECT to_char(public."answer"."created_at", 'FMDay') as day,
                    COUNT(*) as answers
              FROM public."answer"
              GROUP BY day`,
    );*/
    const data = await getAnswersStatsDaily();
    return daysComplete(data.data, 'answers');
  }
}
