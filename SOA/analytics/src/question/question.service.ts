import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { paginate } from '../../general-methods/methods';
import { countQuestionsUpvotes, getQuestions } from 'async_calls/async_calls';


@Injectable()
export class QuestionService {
  constructor(@InjectEntityManager() private manager: EntityManager) {}

  async findAll(params, year: number, month: number): Promise<any> {
    return this.manager.transaction(async (manager) => {
      //let questions = await this.manager.find(Question, { relations: ['owner'] });
      let questions = await getQuestions({ owner: true });
      questions = questions.data;
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
      //return withCountQuestionsUpvotes(questions, manager);
      questions = await countQuestionsUpvotes(questions);
      return questions.data;
    })
  }

}
