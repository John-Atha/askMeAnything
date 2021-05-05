import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import {
  paginate,
  withCountAnswersUpvotes,
} from '../../general-methods/methods';
import { EntityManager } from 'typeorm';
import { Answer } from './entities/answer.entity';

@Injectable()
export class AnswerService {
  constructor(@InjectEntityManager() private manager: EntityManager) {}

  async findMonthly(params, year: number, month: number): Promise<Answer[]> {
    return this.manager.transaction(async (manager) => {
      let answers = await manager.find(Answer, { relations: ['owner'] });
      answers = answers.filter((answer) => {
        return(
          answer.updated_at.getFullYear() === year &&
          answer.updated_at.getMonth() === month
        );
      });
      answers = paginate(answers, params);
      return withCountAnswersUpvotes(answers, manager);
    });
  }
}
