import { Injectable } from '@nestjs/common';
import { paginate, daysComplete, monthlyCountsParseInt } from '../../general-methods/methods';
import { countAnswersUpvotes, getAnswers, getAnswersStatsDaily, getAnswersStatsMonthly } from 'async_calls/async_calls';

@Injectable()
export class AnswerService {

  async findMonthly(params, year: number, month: number): Promise<any> {
    let answers = await getAnswers({ owner: true });
    answers = answers.data;
    answers = answers.filter((answer) => {
      const date = new Date(answer.updated_at);
      return (
        date.getFullYear() === year &&
        date.getMonth() === month
      );
    });
    answers = paginate(answers, params);
    answers = await countAnswersUpvotes(answers);
    return answers.data;
  }

  async findAll(
    params,
    year: number,
    month: number,
  ): Promise<any> {
    let answers = await getAnswers({ owner: true });
    answers = answers.data;
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
    return answers.data;
  }

  async findStatsMonthly(): Promise<any> {
    const data = await getAnswersStatsMonthly();
    return monthlyCountsParseInt(data.data, 'answers');
  }

  async findStatsDaily(): Promise<any> {
    const data = await getAnswersStatsDaily();
    return daysComplete(data.data, 'answers');
  }
}
