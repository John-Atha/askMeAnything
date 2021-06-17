import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { addNestedOwnerToObjList, countAnswersUpvotes, paginate } from '../../general_methods/methods';
import { EntityManager } from 'typeorm';
import { Answer } from './entities/answer.entity';
@Injectable()
export class AnswerService {
  constructor(@InjectEntityManager() private manager: EntityManager) {}

  async findMonthly(params, year: number, month: number): Promise<any> {
    return this.manager.transaction(async (manager) => {
      let answers = await manager.find(Answer, { relations: ['owner'] });
      answers = answers.filter((answer) => {
        const date = new Date(answer.updated_at);
        return (
          date.getFullYear() === year &&
          date.getMonth() === month
        );
      });
      answers = paginate(answers, params);
      answers = await countAnswersUpvotes(answers);
      answers = await addNestedOwnerToObjList(answers);
      return answers;
    });
  }

  async findAll(
    params,
    year: number,
    month: number,
  ): Promise<any> {
    return this.manager.transaction(async (manager) => {
      let answers = await manager.find(Answer, { relations: ['owner'] });
      if (year && month) {
        answers = answers.filter((answer) => {
          const date = new Date(answer.updated_at);
          return (
            date.getFullYear() === year &&
            date.getMonth() === month
          );
        });
      }
      else if (year && !month) {
        answers = answers.filter((answer) => {
          const date = new Date(answer.updated_at);
          return (
            date.getFullYear() === year
          );
        });
      }
      answers.sort((a, b) => (a.created_at > b.created_at) ? -1 : 1 );
      answers = paginate(answers, params);
      answers = await countAnswersUpvotes(answers);
      answers = await addNestedOwnerToObjList(answers);
      return answers;
    });
  }
}
