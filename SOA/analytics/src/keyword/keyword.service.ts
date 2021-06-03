import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import {
  paginate,
} from '../../general-methods/methods';
import { countQuestionsUpvotes, getOneKeyword } from 'async_calls/async_calls';

@Injectable()
export class KeywordService {
  constructor(@InjectEntityManager() private manager: EntityManager) {}

  async findQuestionsMonthly(params, id, year, month): Promise<any> {
    return this.manager.transaction(async (manager) => {
      /*const keyword = await manager.findOne(Keyword, id, {
        relations: ['questions', 'questions.owner'],
      });*/
      const query_params = {
        id,
        questions: true,
        questionsOwner: true,
      }
      const keyword = await getOneKeyword(query_params);
      if (!keyword.data) {
        throw new NotFoundException(`Keyword '${id}' not found.`);
      }
      let questions = keyword.data.questions;
      questions = questions.filter((question) => {
        const date = new Date(question.updated_at);
        return (
          date.getFullYear() === year &&
          date.getMonth() === month
        );
      });
      questions = paginate(questions, params);
      //return withCountQuestionsUpvotes(questions, manager);
      questions = await countQuestionsUpvotes(questions);
      return questions.data;
    });
  }

  async findAll(
    params: any,
    id: number,
    year: number,
    month: number
  ): Promise<any> {
    return this.manager.transaction(async (manager) => {
      /*const keyword = await manager.findOne(Keyword, id, {
        relations: ['questions', 'questions.owner'],
      });*/
      const query_params = {
        id,
        questions: true,
        questionsOwner: true,
      };
      const keyword = await getOneKeyword(query_params);
      if (!keyword.data) {
        throw new NotFoundException(`Keyword '${id}' not found.`);
      }
      let questions = keyword.data.questions;
      if (year && month) {
        questions = questions.filter((question) => {
          const date = new Date(question.updated_at);
          return (
            date.getFullYear() === year &&
            date.getMonth() === month
          );
        });  
      }
      else if (year && !month) {
        questions = questions.filter((question) => {
          const date = new Date(question.updated_at);
          return (
            date.getFullYear() === year
          );
        });
      }
      questions = paginate(questions, params);
      //return withCountQuestionsUpvotes(questions, manager);
      questions = await countQuestionsUpvotes(questions);
      return questions.data;
    });
  }

}