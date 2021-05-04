import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { Question } from './entities/question.entity';
import { paginate } from '../../general-methods/methods';

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
      return this.withCountQuestionsUpvotes(questions);  
    })
  }

  async countMonthly() {
    return this.manager.query(
      `SELECT DATE_TRUNC('month', public."question"."updated_at") as upd_month, COUNT(*) FROM public."question" GROUP BY upd_month`,
    );
  }

  async withCountQuestionsUpvotes(questions: Question[]): Promise<any> {
    for (let i=0; i<questions.length; i++) {
      const count = await this.manager.query(
        `SELECT COUNT(*) FROM public."question_upvote" WHERE public."question_upvote"."questionId"=${questions[i].id}`,
      );
      questions[i]['upvotesCount'] = await parseInt(count[0]['count']);
    }
    return questions;
  }
}
