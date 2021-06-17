import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { daysComplete, monthlyCountsParseInt } from '../../general_methods/methods';
import { EntityManager } from 'typeorm';

@Injectable()
export class QuestionService {
  constructor(@InjectEntityManager() private manager: EntityManager) {}

  async findStatsMonthly(): Promise<any> {
    const data = await this.manager.query(
      `SELECT to_char(public."question"."created_at", 'YYYY-MM') as month,
                      COUNT(*) as questions
               FROM public."question"
               GROUP BY month`,
    );
    return monthlyCountsParseInt(data, 'questions');
  }

  async findStatsDaily(): Promise<any> {
    const data = await this.manager.query(
      `SELECT to_char(public."question"."created_at", 'FMDay') as day,
                    COUNT(*) as questions
              FROM public."question"
              GROUP BY day`,
    );
    return daysComplete(data, 'questions');
  }
}
