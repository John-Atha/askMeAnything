import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import {
  paginate,
} from '../../general-methods/methods';
import { countAnswersAndQuestionsUpvotes, countQuestionsUpvotes, getAnswers, getOneUser, getQuestions, getUserAnswered } from 'async_calls/async_calls';

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
}
