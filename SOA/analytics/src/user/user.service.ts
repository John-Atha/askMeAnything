import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { daysComplete, paginate, monthlyCountsParseInt, verify } from "../../general-methods/methods";
import {
  countAnswersAndQuestionsUpvotes,
  countQuestionsUpvotes,
  getAnswers,
  getOneUser,
  getQuestions,
  getUserAnswered,
  getUserAnswersStatsDaily,
  getUserQuestionsStatsDaily,
  getUserAnswersStatsMonthly,
  getUserQuestionsStatsMonthly, 
  getRanking,
  getUserAnsweredStatsMonthly,
  getUserAnsweredStatsDaily 
} from 'async_calls/async_calls';

@Injectable()
export class UserService {
  constructor(@InjectEntityManager() private manager: EntityManager) {}

  async findAllQuestions(
    params: any,
    id: number,
    year: number,
    month: number,
  ): Promise<any> {
    return this.manager.transaction(async (manager) => {
      //const user = await manager.findOne(User, id);
      const user = await getOneUser({ id });
      if (!user.data) {
        throw new NotFoundException(`User '${id}' not found.`);
      }
      //let questions = await manager.find(Question, { relations: ['owner'] });
      let questions = await getQuestions({ owner: true });
      questions = questions.data;
      if (year && month) {
        questions = questions.filter((question) => {
          console.log(question);
          const date = new Date(question.updated_at);
          return (
            question.owner.id === id &&
            date.getFullYear() === year &&
            date.getMonth() === month
          );
        });
      }
      else if (year && !month) {
        questions = questions.filter((question) => {
          const date = new Date(question.updated_at);
          return (
            question.owner.id === id &&
            date.getFullYear() === year
          );    

        });
      }
      else {
        questions = questions.filter((question) => {
          return question.owner.id === id;
        });
      }
      questions = paginate(questions, params);
      questions = await countQuestionsUpvotes(questions);
      return questions.data;
      //return withCountQuestionsUpvotes(questions, manager);
    });
  }

  async findAllAnswers(
    params: any,
    id: number,
    year: number,
    month: number,
  ): Promise<any> {
    return this.manager.transaction(async (manager) => {
      //const user = await manager.findOne(User, id);
      const user = await getOneUser({ id });
      if (!user.data) {
        throw new NotFoundException(`User '${id}' not found.`);
      }
      /*let answers = await manager.find(Answer, {
        relations: ['owner', 'question', 'question.owner'],
      });*/
      const query_params = {
        id,
        owner: true,
        question: true,
        questionOwner: true,
      }
      let answers = await getAnswers(query_params);
      answers = answers.data;
      if (year && month) {
        answers = answers.filter((answer) => {
          const date = new Date(answer.updated_at);
          return (
            answer.owner.id === id &&
            date.getFullYear() === year &&
            date.getMonth() === month
          );
        });
      }
      else if (year && !month) {
        answers = answers.filter((answer) => {
          const date = new Date(answer.updated_at);
          return (
            answer.owner.id === id &&
            date.getFullYear() === year
          );
        });
      }
      else {
        answers = answers.filter((answer) => {
          return answer.owner.id === id;
        });
      }
      answers = paginate(answers, params);
      //return withCountAnswersAndQuestionsUpvotes(answers, manager);
      answers = await countAnswersAndQuestionsUpvotes(answers);
      return answers.data;
    });
  }

  async findAllAnsweredQuestions(
    params: any,
    id: number,
    year: number,
    month: any,
  ): Promise<any> {
    return this.manager.transaction(async (manager) => {
      //const user = await manager.findOne(User, id);
      const user = await getOneUser({ id });
      if (!user.data) {
        throw new NotFoundException(`User ${id} not found.`);
      }
      const query_params = {
        year,
        month,
      }
      let questions = await getUserAnswered(id, query_params);
      console.log(questions.data);
      questions = paginate(questions.data, params);
      //return questions;
      questions = await countQuestionsUpvotes(questions);
      questions = questions.data;
      for (let i=0; i<questions.length; i++) {
        questions[i]['owner'] = {
          id: questions[i].ownerid,
          email: questions[i].email,
          username: questions[i].username,
          points: questions[i].points,
        };
        delete questions[i].ownerid;
        delete questions[i].email;
        delete questions[i].username;
        delete questions[i].points;
      }
      //return withCountQuestionsUpvotesAndReform(questions, manager);
      return questions;
    });
  }

  async findQuestionsStatsMonthly(id: number): Promise<any> {
    return this.manager.transaction(async () => {
      //const user = await manager.findOne(User, id);
      const user = await getOneUser({ id });
      if (!user.data) {
        throw new NotFoundException(`User '${id}' not found.`);
      }
      /*const data = await this.manager.query(
        `SELECT to_char(public."question"."created_at", 'YYYY-MM') as month,
                      COUNT(*) as questions
               FROM public."question"
               WHERE public."question"."ownerId"=${id}
               GROUP BY month`,
      );*/
      const data = await getUserQuestionsStatsMonthly(id);
      return monthlyCountsParseInt(data.data, 'questions');
    });
  }

  async findAnswersStatsMonthly(id: number): Promise<any> {
    return this.manager.transaction(async () => {
      //const user = await manager.findOne(User, id);
      const user = await getOneUser({ id });
      if (!user.data) {
        throw new NotFoundException(`User '${id}' not found.`);
      }
      /*const data = await this.manager.query(
        `SELECT to_char(public."answer"."created_at", 'YYYY-MM') as month,
                      COUNT(*) as answers
               FROM public."answer"
               WHERE public."answer"."ownerId"=${id}
               GROUP BY month`,
      );*/
      const data = await getUserAnswersStatsMonthly(id);
      return monthlyCountsParseInt(data.data, 'answers');
    });
  }

  async findQuestionsStatsDaily(id: number): Promise<any> {
    return this.manager.transaction(async (manager) => {
      //const user = await manager.findOne(User, id);
      const user = await getOneUser({ id });
      if (!user.data) {
        throw new NotFoundException(`User '${id}' not found.`);
      }
      /*const data = await manager.query(
        `SELECT to_char(public."question"."created_at", 'FMDay') as day,
                        COUNT(*) as questions
                 FROM public."question"
                 WHERE public."question"."ownerId"=${id}
                 GROUP BY day`,
      );*/
      const data = await getUserQuestionsStatsDaily(id);
      return daysComplete(data.data, 'questions');
    });
  }

  async findAnswersStatsDaily(id: number): Promise<any> {
    return this.manager.transaction(async (manager) => {
      //const user = await manager.findOne(User, id);
      const user = await getOneUser({ id });
      if (!user.data) {
        throw new NotFoundException(`User '${id}' not found.`);
      }
      /*const data = await manager.query(
        `SELECT to_char(public."answer"."created_at", 'FMDay') as day,
                       COUNT(*) as answers
               FROM public."answer"
               WHERE public."answer"."ownerId"=${id}
               GROUP BY day`,
      );*/
      const data = await getUserAnswersStatsDaily(id);
      return daysComplete(data.data, 'answers');
    });
  }

  async ranking(req: any, params: any): Promise<any> {
    let user_id = null;
    let position = null;
    try {
      user_id = await verify(req);
    }
    catch {
      ;
    }
    /*const users = await this.manager
      .createQueryBuilder()
      .select('user')
      .from(User, 'user')
      .orderBy('user.points', 'DESC')
      .addOrderBy('user.username', 'ASC')
      .getMany();*/
      let users = await getRanking();
      users = users.data;
    if (user_id) {
      for (let i=0; i<users.length; i++) {
        if (users[i].id===user_id) {
          position = i+1;
          break;
        }
      }
    }
    return {
      ranking: paginate(users, params),
      position: position,
    } 
  }

  async findAnsweredStatsMonthly(id: number): Promise<any> {
    return this.manager.transaction(async (manager) => {
      //const user = await manager.findOne(User, id);
      const user = await getOneUser({ id });
      if (!user.data) {
        throw new NotFoundException(`User '${id}' not found.`);
      }
      /*const data = await manager.query(
        `SELECT COUNT (DISTINCT public."question"."id") as answered,
                to_char(public."answer"."created_at", 'YYYY-MM') as month
         FROM  public."answer", public."question", public."user"
         WHERE public."answer"."ownerId"=${id}
           AND public."user"."id"=${id}
           AND public."question"."id"=public."answer"."questionId"
         GROUP BY month`,
      );*/
      const data = await getUserAnsweredStatsMonthly(id);
      return monthlyCountsParseInt(data.data, 'answered'); 
    })
  }

  async findAnsweredStatsDaily(id: number): Promise<any> {
    return this.manager.transaction(async (manager) => {
      //const user = await manager.findOne(User, id);
      const user = await getOneUser({ id });
      if (!user.data) {
        throw new NotFoundException(`User '${id}' not found.`);
      }
      /*const data = await this.manager.query(
        `SELECT COUNT (DISTINCT public."question"."id") as answered,
                to_char(public."answer"."created_at", 'FMDay') as day
         FROM  public."answer", public."question", public."user"
         WHERE public."answer"."ownerId"=${id}
           AND public."user"."id"=${id}
           AND public."question"."id"=public."answer"."questionId"
         GROUP BY day`,
      );*/
      const data = await getUserAnsweredStatsDaily(id);
      return daysComplete(data.data, 'answered');
    })
  }

}
