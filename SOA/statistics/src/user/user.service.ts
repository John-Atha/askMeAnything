import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { User } from './entities/user.entity';
import {paginate} from "../../general-methods/methods";
import { Question } from 'src/question/entities/question.entity';

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
                      COUNT(*)
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
                      COUNT(*)
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
      return manager.query(
        `SELECT to_char(public."question"."created_at", 'FMDay') as day,
                        COUNT(*)
                 FROM public."question"
                 WHERE public."question"."ownerId"=${id}
                 GROUP BY day`,
      );
    });
  }

  async findAnswersStatsDaily(id: number): Promise<any> {
    return this.manager.transaction(async (manager) => {
      const user = await manager.findOne(User, id);
      if (!user) {
        throw new NotFoundException(`User '${id}' not found.`);
      }
      return manager.query(
        `SELECT to_char(public."answer"."created_at", 'FMDay') as day,
                       COUNT(*)
               FROM public."answer"
               WHERE public."answer"."ownerId"=${id}
               GROUP BY day`,
      );
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
          count: parseInt(item.count),
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
      const temp = await this.manager.query(
        `SELECT COUNT (DISTINCT public."question"."id"),
                to_char(public."answer"."created_at", 'FMDay') as day
         FROM  public."answer", public."question", public."user"
         WHERE public."answer"."ownerId"=${id}
           AND public."user"."id"=${id}
           AND public."question"."id"=public."answer"."questionId"
         GROUP BY day`,
      );
      return temp.map((item) =>{
        return {
          count: parseInt(item.count),
          day: item.day
        };
      }); 
    })
  }
}