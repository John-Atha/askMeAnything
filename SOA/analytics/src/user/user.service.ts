import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { Question } from '../question/entities/question.entity';
import { EntityManager } from 'typeorm';
import { paginate, withCountQuestionsUpvotes } from '../../general-methods/methods';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(@InjectEntityManager() private manager: EntityManager) {}

  async findQuestionsMonthly(params, id: number, year: number, month: number): Promise<Question[]> {
    return this.manager.transaction(async (manager) => {
      const user = await manager.findOne(User, id);
      if (!user) {
        throw new NotFoundException(`User '${id}' not found.`);
      }
      let questions = await manager.find(Question, { relations: ['owner'] });
      questions = questions.filter((question) => {
        return (
          question.owner.id === id &&
          question.updated_at.getFullYear() === year &&
          question.updated_at.getMonth() === month
        );
      });
      questions = paginate(questions, params);
      return withCountQuestionsUpvotes(questions, manager);
    })
  }

  async countQuestionsMonthly(id: number) {
    return this.manager.query(
      `SELECT DATE_TRUNC('month', public."question"."updated_at") as upd_month, COUNT(*) FROM public."question" WHERE public."question"."ownerId"=${id} GROUP BY upd_month`,
    );  
  }
}
