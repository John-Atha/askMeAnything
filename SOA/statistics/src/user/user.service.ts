import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { User } from './entities/user.entity';
import {daysComplete, paginate} from "../../general-methods/methods";

@Injectable()
export class UserService {
  constructor(@InjectEntityManager() private manager: EntityManager) {}

  async findQuestionsStatsMonthly(id: number): Promise<any> {
    return this.manager.transaction(async (manager) => {
      const user = await manager.findOne(User, id);
      if (!user) {
        throw new NotFoundException(`User '${id}' not found.`);
      }
      return this.manager.query(
        `SELECT to_char(public."question"."created_at", 'YYYY-MM') as month,
                      COUNT(*) as questions
               FROM public."question"
               WHERE public."question"."ownerId"=${id}
               GROUP BY month`,
      );
    });
  }

  async findAnswersStatsMonthly(id: number): Promise<any> {
    return this.manager.transaction(async (manager) => {
      const user = await manager.findOne(User, id);
      if (!user) {
        throw new NotFoundException(`User '${id}' not found.`);
      }
      return this.manager.query(
        `SELECT to_char(public."answer"."created_at", 'YYYY-MM') as month,
                      COUNT(*) as answers
               FROM public."answer"
               WHERE public."answer"."ownerId"=${id}
               GROUP BY month`,
      );
    });
  }

  async findQuestionsStatsDaily(id: number): Promise<any> {
    return this.manager.transaction(async (manager) => {
      const user = manager.findOne(User, id);
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

  async ranking(params: any): Promise<User[]> {
    const users = await this.manager
      .createQueryBuilder()
      .select('user')
      .from(User, 'user')
      .orderBy('user.points', 'DESC')
      .addOrderBy('user.username', 'ASC')
      .getMany();
    return paginate(users, params);
  }

  async findAnsweredStatsMonthly(id: number): Promise<any> {
    return this.manager.transaction(async (manager) => {
      const user = await manager.findOne(User, id);
      if (!user) {
        throw new NotFoundException(`User '${id}' not found.`);
      }
      const temp = await manager.query(
        `SELECT COUNT (DISTINCT public."question"."id"),
                to_char(public."answer"."created_at", 'YYYY-MM') as month
         FROM  public."answer", public."question", public."user"
         WHERE public."answer"."ownerId"=${id}
           AND public."user"."id"=${id}
           AND public."question"."id"=public."answer"."questionId"
         GROUP BY month`,
      );
      return temp.map((item) =>{
        return {
          answered: parseInt(item.count),
          month: item.month
        };
      });  
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