import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { daysComplete, monthlyCountsParseInt } from '../../general-methods/methods';
import { EntityManager } from 'typeorm';

@Injectable()
export class AnswerService {
  constructor(@InjectEntityManager() private manager: EntityManager) {}

  async findStatsMonthly(): Promise<any> {
    const data = await this.manager.query(
      `SELECT to_char(public."answer"."created_at", 'YYYY-MM') as month,
                    COUNT(*) as answers
               FROM public."answer"
               GROUP BY month`,
    );
    return monthlyCountsParseInt(data, 'answers');
  }

  async findStatsDaily(): Promise<any> {
    const data = await this.manager.query(
      `SELECT to_char(public."answer"."created_at", 'FMDay') as day,
                    COUNT(*) as answers
              FROM public."answer"
              GROUP BY day`,
    );
    return daysComplete(data, 'answers');
  }
}
