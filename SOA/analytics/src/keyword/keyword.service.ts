import { Injectable, NotFoundException } from '@nestjs/common';
import { paginate, daysComplete, monthlyCountsParseInt } from '../../general-methods/methods';
import { countQuestionsUpvotes, getOneKeyword, getKeywordStatsDaily, getKeywordStatsMonthly } from 'async_calls/async_calls';

@Injectable()
export class KeywordService {
  constructor() {}

  async findQuestionsMonthly(params, id, year, month): Promise<any> {
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
    questions = await countQuestionsUpvotes(questions);
    return questions.data;
  }

  async findAll(
    params: any,
    id: number,
    year: number,
    month: number
  ): Promise<any> {
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
    questions = await countQuestionsUpvotes(questions);
    return questions.data;
  }

  async findStatsMonthly(id: number): Promise<any> {
    const keyword = await getOneKeyword({ id });
    if (!keyword.data) {
      throw new NotFoundException(`Keyword '${id}' not found.`);
    }
    const data = await getKeywordStatsMonthly(id);
    return monthlyCountsParseInt(data.data, 'questions');
  }

  async findStatsDaily(id: number) {
    const keyword = await getOneKeyword({ id });
    if (!keyword.data) {
      throw new NotFoundException(`Keyword '${id}' not found.`);
    }
    const data = await getKeywordStatsDaily(id);
    return daysComplete(data.data, 'questions');
  }

}