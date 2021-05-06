import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { Question } from '../question/entities/question.entity';
import { Answer } from '../answer/entities/answer.entity';
import { EntityManager } from 'typeorm';
import {
  paginate,
  withCountQuestionsUpvotes,
  withCountQuestionsUpvotesAndReform,
  withCountAnswersAndQuestionsUpvotes,
} from '../../general-methods/methods';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(@InjectEntityManager() private manager: EntityManager) {}

  async findAllQuestions(
    params,
    id: number,
    year: number,
    month: number,
  ): Promise<Question[]> {
    return this.manager.transaction(async (manager) => {
      const user = await manager.findOne(User, id);
      if (!user) {
        throw new NotFoundException(`User '${id}' not found.`);
      }
      let questions = await manager.find(Question, { relations: ['owner'] });
      if (year && month) {
        questions = questions.filter((question) => {
          return (
            question.owner.id === id &&
            question.updated_at.getFullYear() === year &&
            question.updated_at.getMonth() === month
          );
        });
      } else if (year && !month) {
        questions = questions.filter((question) => {
          return (
            question.owner.id === id &&
            question.updated_at.getFullYear() === year
          );
        });
      } else {
        questions = questions.filter((question) => {
          return question.owner.id === id;
        });
      }
      questions = paginate(questions, params);
      return withCountQuestionsUpvotes(questions, manager);
    });
  }

  async findAllAnswers(
    params,
    id: number,
    year: number,
    month: number,
  ): Promise<Answer[]> {
    return this.manager.transaction(async (manager) => {
      const user = await manager.findOne(User, id);
      if (!user) {
        throw new NotFoundException(`User '${id}' not found.`);
      }
      let answers = await manager.find(Answer, {
        relations: ['owner', 'question', 'question.owner'],
      });
      if (year && month) {
        answers = answers.filter((answer) => {
          return (
            answer.owner.id === id &&
            answer.updated_at.getFullYear() === year &&
            answer.updated_at.getMonth() === month
          );
        });
      } else if (year && !month) {
        answers = answers.filter((answer) => {
          return (
            answer.owner.id === id && answer.updated_at.getFullYear() === year
          );
        });
      } else {
        answers = answers.filter((answer) => {
          return answer.owner.id === id;
        });
      }
      answers = paginate(answers, params);
      return withCountAnswersAndQuestionsUpvotes(answers, manager);
    });
  }

  async findAllAnsweredQuestions(
    params,
    id: number,
    year: number,
    month: number,
  ): Promise<Question[]> {
    return this.manager.transaction(async (manager) => {
      const user = await manager.findOne(User, id);
      if (!user) {
        throw new NotFoundException(`User ${id} not found.`);
      }
      let questions = await manager.query(
        `SELECT public."question"."id",
                      public."question"."title",
                      public."question"."text",
                      public."question"."created_at",
                      public."question"."updated_at",
                      public."user"."id" as ownerId,
                      public."user"."email",
                      public."user"."username",
                      public."user"."points"
                 FROM  public."answer", public."question", public."user"
                 WHERE public."answer"."ownerId"=${id}
                   AND public."user"."id"=${id}
                   AND public."question"."id"=public."answer"."questionId"`,
      );
      console.log(questions);
      questions = paginate(questions, params);
      //return questions;
      return withCountQuestionsUpvotesAndReform(questions, manager);
    });
  }
}
