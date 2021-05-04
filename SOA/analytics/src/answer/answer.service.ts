import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { paginate } from '../../general-methods/methods';
import { EntityManager } from 'typeorm';
import { Answer } from './entities/answer.entity';

@Injectable()
export class AnswerService {
  constructor(@InjectEntityManager() private manager: EntityManager) {}

  async findMonthly(params, year: number, month: number): Promise<Answer[]> {
    return this.manager.transaction( async (manager) => {
      let answers = await manager.find(Answer, { relations: ['owner'] });
      answers = answers.filter((answer) => {
        return(
          answer.updated_at.getFullYear() === year &&
          answer.updated_at.getMonth() === month
        );
      });
      answers = paginate(answers, params);
      return this.withCountAnswersUpvotes(answers);
    })
  }

  async countMonthly() {
    return this.manager.query(
      `SELECT DATE_TRUNC('month', public."answer"."updated_at") as upd_month, COUNT(*) FROM public."answer" GROUP BY upd_month`,
    );
  }

  async withCountAnswersUpvotes(answers: Answer[]): Promise<any> {
    for (let i=0; i<answers.length; i++) {
      const count = await this.manager.query(
        `SELECT COUNT(*) FROM public."answer_upvote" WHERE public."answer_upvote"."answerId"=${answers[i].id}`,
      );
      answers[i]['upvotesCount'] = await parseInt(count[0]['count']);
    }
    return answers;
  }
}
