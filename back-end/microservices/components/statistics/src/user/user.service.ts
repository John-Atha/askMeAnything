import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { daysComplete, monthlyCountsParseInt } from 'general_methods/methods';
import { User } from '../user/entities/user.entity';
@Injectable()
export class UserService {
  constructor(@InjectEntityManager() private manager: EntityManager) {}

  async findQuestionsStatsMonthly(id: number): Promise<any> {
    return this.manager.transaction(async (manager) => {
      const user = await manager.findOne(User, id);
      if (!user) {
        throw new NotFoundException(`User '${id}' not found.`);
      }
      const data = await this.manager.query(
        `SELECT to_char(public."question"."created_at", 'YYYY-MM') as month,
                      COUNT(*) as questions
               FROM public."question"
               WHERE public."question"."ownerId"=${id}
               GROUP BY month`,
      );
      return monthlyCountsParseInt(data, 'questions');
    });
  }

  async findAnswersStatsMonthly(id: number): Promise<any> {
    return this.manager.transaction(async (manager) => {
      const user = await manager.findOne(User, id);
      if (!user) {
        throw new NotFoundException(`User '${id}' not found.`);
      }
      const data = await this.manager.query(
        `SELECT to_char(public."answer"."created_at", 'YYYY-MM') as month,
                      COUNT(*) as answers
               FROM public."answer"
               WHERE public."answer"."ownerId"=${id}
               GROUP BY month`,
      );
      return monthlyCountsParseInt(data, 'answers');
    });
  }

  async findQuestionsStatsDaily(id: number): Promise<any> {
    return this.manager.transaction(async (manager) => {
      const user = await manager.findOne(User, id);
      if (!user) {
        throw new NotFoundException(`User '${id}' not found.`);
      }
      const data = await manager.query(
        `SELECT to_char(public."question"."created_at", 'FMDay') as day,
                        COUNT(*) as questions
                 FROM public."question"
                 WHERE public."question"."ownerId"=${id}
                 GROUP BY day`,
      );
      return daysComplete(data, 'questions');
    });
  }

  async findAnswersStatsDaily(id: number): Promise<any> {
    return this.manager.transaction(async (manager) => {
      const user = await manager.findOne(User, id);
      if (!user) {
        throw new NotFoundException(`User '${id}' not found.`);
      }
      const data = await manager.query(
        `SELECT to_char(public."answer"."created_at", 'FMDay') as day,
                       COUNT(*) as answers
               FROM public."answer"
               WHERE public."answer"."ownerId"=${id}
               GROUP BY day`,
      );
      return daysComplete(data, 'answers');
    });
  }

  async findAnsweredStatsMonthly(id: number): Promise<any> {
    return this.manager.transaction(async (manager) => {
      const user = await manager.findOne(User, id);
      if (!user) {
        throw new NotFoundException(`User '${id}' not found.`);
      }
      const data = await manager.query(
        `SELECT COUNT (DISTINCT public."question"."id") as answered,
                to_char(public."answer"."created_at", 'YYYY-MM') as month
         FROM  public."answer", public."question", public."user"
         WHERE public."answer"."ownerId"=${id}
           AND public."user"."id"=${id}
           AND public."question"."id"=public."answer"."questionId"
         GROUP BY month`,
      );
      return monthlyCountsParseInt(data, 'answered'); 
    })
  }

  async findAnsweredStatsDaily(id: number): Promise<any> {
    return this.manager.transaction(async (manager) => {
      const user = await manager.findOne(User, id);
      if (!user) {
        throw new NotFoundException(`User '${id}' not found.`);
      }
      const data = await this.manager.query(
        `SELECT COUNT (DISTINCT public."question"."id") as answered,
                to_char(public."answer"."created_at", 'FMDay') as day
         FROM  public."answer", public."question", public."user"
         WHERE public."answer"."ownerId"=${id}
           AND public."user"."id"=${id}
           AND public."question"."id"=public."answer"."questionId"
         GROUP BY day`,
      );
      return daysComplete(data, 'answered');
    })
  }
}