import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { Question } from '../question/entities/question.entity';
import { EntityManager } from 'typeorm';
import { Keyword } from './entities/keyword.entity';
import { paginate, withCountQuestionsUpvotes } from '../../general-methods/methods';

@Injectable()
export class KeywordService {
  constructor(@InjectEntityManager() private manager: EntityManager) {}

  async findQuestionsMonthly(params, id, year, month): Promise<Question[]> {
    return this.manager.transaction(async (manager) => {
      const keyword = await manager.findOne(Keyword, id, { relations: ['questions', 'questions.owner'] });
      if (!keyword) {
        throw new NotFoundException(`Keyword '${id}' not found.`);
      }
      const questions = paginate(keyword.questions, params);
      return withCountQuestionsUpvotes(questions, manager);
    });
  }
}
