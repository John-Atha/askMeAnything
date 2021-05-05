import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';

@Injectable()
export class QuestionService {
  constructor(@InjectEntityManager() private manager: EntityManager) {}

  async findStatsMonthly(): Promise<any> {
    return this.manager.query(
      `SELECT DATE_TRUNC('month', public."question"."created_at") as month,
                      COUNT(*) as questions
               FROM public."question"
               GROUP BY month`,
    );
  }

  async findStatsDaily(): Promise<any> {
    return this.manager.query(
      `SELECT to_char(public."question"."created_at", 'FMDay') as day,
                    COUNT(*) as questions
              FROM public."question"
              GROUP BY day`,
    );
  }
}
