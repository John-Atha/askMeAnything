import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { daysComplete, paginate, monthlyCountsParseInt, verify } from "../../general-methods/methods";
import { getAnswersStatsDaily,
         getQuestionsStatsDaily,
         getAnswersStatsMonthly,
         getOneUser,
         getQuestionsStatsMonthly, 
         getRanking,
         getAnsweredStatsMonthly,
         getAnsweredStatsDaily} from '../../async_calls/async_calls';

@Injectable()
export class UserService {
  constructor(@InjectEntityManager() private manager: EntityManager) {}

  async findQuestionsStatsMonthly(id: number): Promise<any> {
    return this.manager.transaction(async () => {
      //const user = await manager.findOne(User, id);
      const user = await getOneUser({ id });
      if (!user.data) {
        throw new NotFoundException(`User '${id}' not found.`);
      }
      /*const data = await this.manager.query(
        `SELECT to_char(public."question"."created_at", 'YYYY-MM') as month,
                      COUNT(*) as questions
               FROM public."question"
               WHERE public."question"."ownerId"=${id}
               GROUP BY month`,
      );*/
      const data = await getQuestionsStatsMonthly(id);
      return monthlyCountsParseInt(data.data, 'questions');
    });
  }

  async findAnswersStatsMonthly(id: number): Promise<any> {
    return this.manager.transaction(async () => {
      //const user = await manager.findOne(User, id);
      const user = await getOneUser({ id });
      if (!user.data) {
        throw new NotFoundException(`User '${id}' not found.`);
      }
      /*const data = await this.manager.query(
        `SELECT to_char(public."answer"."created_at", 'YYYY-MM') as month,
                      COUNT(*) as answers
               FROM public."answer"
               WHERE public."answer"."ownerId"=${id}
               GROUP BY month`,
      );*/
      const data = await getAnswersStatsMonthly(id);
      return monthlyCountsParseInt(data.data, 'answers');
    });
  }

  async findQuestionsStatsDaily(id: number): Promise<any> {
    return this.manager.transaction(async (manager) => {
      //const user = await manager.findOne(User, id);
      const user = await getOneUser({ id });
      if (!user.data) {
        throw new NotFoundException(`User '${id}' not found.`);
      }
      /*const data = await manager.query(
        `SELECT to_char(public."question"."created_at", 'FMDay') as day,
                        COUNT(*) as questions
                 FROM public."question"
                 WHERE public."question"."ownerId"=${id}
                 GROUP BY day`,
      );*/
      const data = await getQuestionsStatsDaily(id);
      return daysComplete(data.data, 'questions');
    });
  }

  async findAnswersStatsDaily(id: number): Promise<any> {
    return this.manager.transaction(async (manager) => {
      //const user = await manager.findOne(User, id);
      const user = await getOneUser({ id });
      if (!user.data) {
        throw new NotFoundException(`User '${id}' not found.`);
      }
      /*const data = await manager.query(
        `SELECT to_char(public."answer"."created_at", 'FMDay') as day,
                       COUNT(*) as answers
               FROM public."answer"
               WHERE public."answer"."ownerId"=${id}
               GROUP BY day`,
      );*/
      const data = await getAnswersStatsDaily(id);
      return daysComplete(data.data, 'answers');
    });
  }

  async ranking(req: any, params: any): Promise<any> {
    let user_id = null;
    let position = null;
    try {
      user_id = await verify(req);
    }
    catch {
      ;
    }
    /*const users = await this.manager
      .createQueryBuilder()
      .select('user')
      .from(User, 'user')
      .orderBy('user.points', 'DESC')
      .addOrderBy('user.username', 'ASC')
      .getMany();*/
      let users = await getRanking();
      users = users.data;
    if (user_id) {
      for (let i=0; i<users.length; i++) {
        if (users[i].id===user_id) {
          position = i+1;
          break;
        }
      }
    }
    return {
      ranking: paginate(users, params),
      position: position,
    } 
  }

  async findAnsweredStatsMonthly(id: number): Promise<any> {
    return this.manager.transaction(async (manager) => {
      //const user = await manager.findOne(User, id);
      const user = await getOneUser({ id });
      if (!user.data) {
        throw new NotFoundException(`User '${id}' not found.`);
      }
      /*const data = await manager.query(
        `SELECT COUNT (DISTINCT public."question"."id") as answered,
                to_char(public."answer"."created_at", 'YYYY-MM') as month
         FROM  public."answer", public."question", public."user"
         WHERE public."answer"."ownerId"=${id}
           AND public."user"."id"=${id}
           AND public."question"."id"=public."answer"."questionId"
         GROUP BY month`,
      );*/
      const data = await getAnsweredStatsMonthly(id);
      return monthlyCountsParseInt(data.data, 'answered'); 
    })
  }

  async findAnsweredStatsDaily(id: number): Promise<any> {
    return this.manager.transaction(async (manager) => {
      //const user = await manager.findOne(User, id);
      const user = await getOneUser({ id });
      if (!user.data) {
        throw new NotFoundException(`User '${id}' not found.`);
      }
      /*const data = await this.manager.query(
        `SELECT COUNT (DISTINCT public."question"."id") as answered,
                to_char(public."answer"."created_at", 'FMDay') as day
         FROM  public."answer", public."question", public."user"
         WHERE public."answer"."ownerId"=${id}
           AND public."user"."id"=${id}
           AND public."question"."id"=public."answer"."questionId"
         GROUP BY day`,
      );*/
      const data = await getAnsweredStatsDaily(id);
      return daysComplete(data.data, 'answered');
    })
  }
}