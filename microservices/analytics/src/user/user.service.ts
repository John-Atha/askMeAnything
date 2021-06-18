import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { addNestedOwnerToObjList, paginate, countQuestionsUpvotes, countAnswersUpvotes, addNestedOwnerToObj, addNestedQuestionToObjList } from '../../general_methods/methods';
import { Question } from '../question/entities/question.entity';
import { User } from '../user/entities/user.entity';
import { Answer } from '../answer/entities/answer.entity';

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
      const user = await manager.findOne(User, id);
      if (!user) {
        throw new NotFoundException(`User '${id}' not found.`);
      }
      let questions = await manager.find(Question, { relations: ['owner'] });
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
      questions = await addNestedOwnerToObjList(questions);
      questions = await countQuestionsUpvotes(questions);
      return questions;
    });
  }

  async findAllAnswers(
    params: any,
    id: number,
    year: number,
    month: number,
  ): Promise<any> {
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
      answers = await addNestedOwnerToObjList(answers);
      answers = await addNestedQuestionToObjList(answers);
      answers = await countAnswersUpvotes(answers);
      return answers;
    });
  }

  async findAllAnsweredQuestions(
    params: any,
    id: number,
    year: number,
    month: any,
  ): Promise<any> {
    return this.manager.transaction(async (manager) => {
      const user = await manager.findOne(User, id);
      if (!user) {
        throw new NotFoundException(`User ${id} not found.`);
      }
      let questions = [];
      if (year && month) {
        if (month<10) month = '0' + month;
        questions = await this.manager.query(
          `SELECT DISTINCT public."question"."id",
                        public."question"."title",
                        public."question"."text",
                        public."question"."created_at",
                        public."question"."updated_at",
                        public."user"."id" as ownerId
                   FROM  public."answer", public."question", public."user"
                   WHERE public."answer"."ownerId"=${id}
                     AND public."user"."id"=${id}
                     AND public."question"."id"=public."answer"."questionId"
                     AND to_char(public."answer"."created_at", 'YYYY-MM')='${year}-${month}'`,
        );
      }
      else if (year && !month) {
        questions = await this.manager.query(
          `SELECT DISTINCT public."question"."id",
                        public."question"."title",
                        public."question"."text",
                        public."question"."created_at",
                        public."question"."updated_at",
                        public."user"."id" as ownerId
                   FROM  public."answer", public."question", public."user"
                   WHERE public."answer"."ownerId"=${id}
                     AND public."user"."id"=${id}
                     AND public."question"."id"=public."answer"."questionId"
                     AND to_char(public."answer"."created_at", 'YYYY')='${year}'`,
          );
      }
      else {
        questions = await this.manager.query(
          `SELECT DISTINCT public."question"."id",
                        public."question"."title",
                        public."question"."text",
                        public."question"."created_at",
                        public."question"."updated_at",
                        public."user"."id" as ownerId
                   FROM  public."answer", public."question", public."user"
                   WHERE public."answer"."ownerId"=${id}
                     AND public."user"."id"=${id}
                     AND public."question"."id"=public."answer"."questionId"`,
          );
      }
      console.log(questions);
      questions = paginate(questions, params);
      questions = await countQuestionsUpvotes(questions);
      for (let i=0; i<questions.length; i++) {
        questions[i]['owner'] = {
          id: questions[i].ownerid,
        };
        delete questions[i].ownerid;
        questions[i] = await addNestedOwnerToObj(questions[i], questions[i].owner.id);
      }
      return questions;
    });
  }
}
