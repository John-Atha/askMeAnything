import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { addNestedOwnerToObjList, countQuestionsUpvotes, paginate } from '../../general_methods/methods';
import { Keyword } from './entities/keyword.entity';
@Injectable()
export class KeywordService {
  constructor(@InjectEntityManager() private manager: EntityManager) {}

  async findQuestionsMonthly(params, id, year, month): Promise<any> {
    return this.manager.transaction(async (manager) => {
      const keyword = await manager.findOne(Keyword, id, {
        relations: ['questions', 'questions.owner'],
      });
      if (!keyword) {
        throw new NotFoundException(`Keyword '${id}' not found.`);
      }
      let questions = keyword.questions;
      questions = questions.filter((question) => {
        const date = new Date(question.updated_at);
        return (
          date.getFullYear() === year &&
          date.getMonth() === month
        );
      });
      questions = paginate(questions, params);
      questions = await countQuestionsUpvotes(questions);
      questions = await addNestedOwnerToObjList(questions);
      return questions;
    });
  }

  async findAll(
    params: any,
    id: number,
    year: number,
    month: number
  ): Promise<any> {
    return this.manager.transaction(async (manager) => {
      const keyword = await manager.findOne(Keyword, id, {
        relations: ['questions', 'questions.owner'],
      });
      if (!keyword) {
        throw new NotFoundException(`Keyword '${id}' not found.`);
      }
      let questions = keyword.questions;
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
      questions = await countQuestionsUpvotes(questions);
      questions = await addNestedOwnerToObjList(questions);
      return questions;
    });
  }

}