import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { Question } from '../question/entities/question.entity';
import { EntityManager } from 'typeorm';
import { Keyword } from './entities/keyword.entity';
import {
  paginate,
  withCountQuestionsUpvotes,
} from '../../general-methods/methods';

@Injectable()
export class KeywordService {
  constructor(@InjectEntityManager() private manager: EntityManager) {}

  async findQuestionsMonthly(params, id, year, month): Promise<Question[]> {
    return this.manager.transaction(async (manager) => {
      const keyword = await manager.findOne(Keyword, id, {
        relations: ['questions', 'questions.owner'],
      });
      if (!keyword) {
        throw new NotFoundException(`Keyword '${id}' not found.`);
      }
      let questions = keyword.questions;
      questions = questions.filter((question) => {
        return (
          question.updated_at.getFullYear() === year &&
          question.updated_at.getMonth() === month
        );
      });
      questions = paginate(questions, params);
      return withCountQuestionsUpvotes(questions, manager);
    });
  }

  async findAll(
    params,
    id: number,
    year: number,
    month: number
  ): Promise<Question[]> {
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
          return (
            question.updated_at.getFullYear() === year &&
            question.updated_at.getMonth() === month
          );
        });  
      }
      else if (year && !month) {
        questions = questions.filter((question) => {
          return (
            question.updated_at.getFullYear() === year
          );
        });
      }
      questions = paginate(questions, params);
      return withCountQuestionsUpvotes(questions, manager);
    });
  }

}