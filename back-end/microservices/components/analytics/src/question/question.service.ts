import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { paginate, countQuestionsUpvotes, addNestedOwnerToObjList } from '../../general_methods/methods';
import { Question } from './entities/question.entity';

@Injectable()
export class QuestionService {
  constructor(@InjectEntityManager() private manager: EntityManager) {}

  async findAll(params, year: number, month: number): Promise<any> {
    return this.manager.transaction(async (manager) => {
      let questions = await this.manager.find(Question, { relations: ['owner'] });
      if (year && month) {
        questions = questions.filter((question) => {
          const date = new Date(question.created_at);
          return (
            date.getFullYear() === year &&
            date.getMonth() === month
          );
        });
      }
      else if (year && !month) {
        questions = questions.filter((question) => {
          const date = new Date(question.created_at);
          return(
            date.getFullYear() === year
          );
        });
      }
      questions.sort((a, b) => (a.created_at > b.created_at) ? -1 : 1 );
      questions = paginate(questions, params);
      questions = await countQuestionsUpvotes(questions);
      questions = await addNestedOwnerToObjList(questions);
      return questions;
    })
  }

}
