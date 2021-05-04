import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { Question } from './entities/question.entity';
import { paginate, withCountQuestionsUpvotes } from '../../general-methods/methods';


@Injectable()
export class QuestionService {
  constructor(@InjectEntityManager() private manager: EntityManager) {}

  async findMonthly(params, year: number, month: number): Promise<Question[]> {
    return this.manager.transaction( async (manager) => {
      let questions = await manager.find(Question, { relations: ['owner'] });
      questions = questions.filter((question) => {
        return (
          question.updated_at.getFullYear() === year &&
          question.updated_at.getMonth() === month
        );
      });
      questions = paginate(questions, params);
      return withCountQuestionsUpvotes(questions, manager);
    })
  }

  async countMonthly() {
    return this.manager.query(
      `SELECT DATE_TRUNC('month', public."question"."updated_at") as upd_month, COUNT(*) FROM public."question" GROUP BY upd_month`,
    );
  }

}
