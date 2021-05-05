import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { User } from './entities/user.entity';

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
        `SELECT DATE_TRUNC('month', public."question"."updated_at") as upd_month,
                      COUNT(*)
               FROM public."question"
               WHERE public."question"."ownerId"=${id}
               GROUP BY upd_month`,
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
        `SELECT DATE_TRUNC('month', public."answer"."updated_at") as upd_month,
                      COUNT(*)
               FROM public."answer"
               WHERE public."answer"."ownerId"=${id}
               GROUP BY upd_month`,
      );
    });
  }
}
