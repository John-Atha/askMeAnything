import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { addNestedOwnerToObj, paginate } from 'general_methods/methods';
import { EntityManager } from 'typeorm';
import { Question } from './entities/question.entity';
@Injectable()
export class QuestionService {
  constructor(@InjectEntityManager() private manager: EntityManager) {}

  async findQuestionsAnswers(id: number, paramsInit): Promise<any> {
    const question = await this.manager.findOne(Question, id, { relations: ['answers', 'answers.owner'] });
    if (!question) {
      throw new NotFoundException(`Question ${id} not found.`);
    }
    console.log(question.answers);
    let answers = await this.withCountAnswersUpvotes(question.answers);
    answers = await this.addNestedOwners(answers);
    answers = answers.sort((a, b) =>
      a['upvotesCount'] < b['upvotesCount'] ? 1 : -1,
    );
    return paginate(answers, paramsInit);
  }

  async withCountAnswersUpvotes(answers): Promise<any> {
    for (let i = 0; i < answers.length; i++) {
      const count = await this.manager.query(
        `SELECT COUNT(*) FROM public."answer_upvote" WHERE public."answer_upvote"."answerId"=${answers[i].id}`,
      );
      console.log('count:');
      console.log(count);
      answers[i]['upvotesCount'] = await parseInt(count[0]['count']);
    };
    return answers;
  }

  async addNestedOwners(answers: any): Promise<any> {
    for (let i=0; i<answers.length; i++) {
      answers[i] = await addNestedOwnerToObj(answers[i], answers[i].owner.id);
    }
    return answers;
  }
}
