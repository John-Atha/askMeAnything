import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { Question } from './entities/question.entity';
import { paginate, withCountQuestionsUpvotes } from '../../general-methods/methods';


@Injectable()
export class QuestionService {
  constructor(@InjectEntityManager() private manager: EntityManager) {}

  async findAll(params, year: number, month: number): Promise<Question[]> {
    return this.manager.transaction(async (manager) => {
      let questions = await this.manager.find(Question, { relations: ['owner'] });
      if (year && month) {
        questions = questions.filter((question) => {
          return (
            question.created_at.getFullYear() === year &&
            question.created_at.getMonth() === month
          );
        });
      }
      else if (year && !month) {
        questions = questions.filter((question) => {
          return(
            question.created_at.getFullYear() === year
          );
        });
      }
      questions.sort((a, b) => (a.created_at > b.created_at) ? -1 : 1 );
      questions = paginate(questions, params);
      return withCountQuestionsUpvotes(questions, manager);  
    })
  }

}
