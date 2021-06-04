import {
  Injectable,
} from '@nestjs/common';
import { UpdateAnswerDto } from './dto/update-answer.dto';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { Question } from '../question/entities/question.entity';
import { Answer } from './entities/answer.entity';
import { AnswerUpvote } from '../answer-upvote/entities/answer-upvote.entity';
import { User } from '../user/entities/user.entity';

@Injectable()
export class AnswerService {
  constructor(@InjectEntityManager() private manager: EntityManager) {}

  async findOne(params: any): Promise<Answer> {
    let answer = null;
    console.log(`params:`);
    console.log(params);
    if (params.id) {
      let relations = [];
      if (params.owner) relations.push('owner');
      answer = await this.manager.findOne(Answer, params.id, { relations });
      //console.log(answer);
      if (answer) {
        const count = await this.manager.query(
        `SELECT COUNT(*) FROM public."answer_upvote" WHERE public."answer_upvote"."answerId"=${params.id}`,
        );
        answer['upvotesCount'] = await parseInt(count[0]['count']);
      }
    }
    console.log('answer:');
    console.log(answer);
    return answer;
  }

  async find(params: any): Promise<Answer[]> {
    let relations = [];
    if (params.owner) relations.push('owner');
    if (params.question) relations.push('question');
    if (params.questionOwner) relations.push('question.owner');
    const answers = await this.manager.find(Answer, { relations });
    return answers;
  }

  async findOneUpvotes(id: number): Promise<AnswerUpvote[]> {
    let answer = null;
    answer = await this.manager.findOne(Answer, id, { relations: ['upvotes', 'upvotes.owner']});
    return answer;
  }

  async isUpvoted(answer_id: number, user_id: number): Promise<any> {
    return this.manager.transaction(async (manager) => {
      const user = await manager.findOne(User, user_id);
      const answer = await manager.findOne(Answer, answer_id);
      const upvote = await manager.find(AnswerUpvote, { owner: user, answer: answer} );
      return upvote;
    });
  }

  async create(body: any): Promise<Answer> {
    return this.manager.transaction(async (manager) => {
      const owner = await manager.findOne(User, body.owner_id);
      const question = await manager.findOne(Question, body.question_id);
      const answer = await manager.create(Answer, body.createAnswerDto);
      answer.owner = owner;
      answer.question = question;
      return manager.save(answer);
    });
  }

  async update(id: number, updateAnswerDto: UpdateAnswerDto): Promise<Answer> {
    return this.manager.transaction(async (manager) => {
      const answer = await manager.findOne(Answer, id, { relations: ['owner'] });
      const text = updateAnswerDto.text;
      answer.text = text;
      return manager.save(answer);
    });
  }

  async remove(id: number): Promise<any> {
      return this.manager.delete(Answer, id);
  }

  async answersAndQuestionsCountUpvotes(body: any): Promise<Answer[]> {
    const answers = body.answers || [];
    for (let i = 0; i < answers.length; i++) {
      const count = await this.manager.query(
        `SELECT COUNT(*) FROM public."answer_upvote" WHERE public."answer_upvote"."answerId"=${answers[i].id}`,
      );
      answers[i]['upvotesCount'] = await parseInt(count[0]['count']);
      const question = answers[i].question;
      const count2 = await this.manager.query(
        `SELECT COUNT(*) FROM public."question_upvote" WHERE public."question_upvote"."questionId"=${question.id}`,
      );
      question['upvotesCount'] = await parseInt(count2[0]['count']);
    }
    return answers;
  }

  async answersCountUpvotes(body: any): Promise<Answer[]> {
    const answers = body.answers || [];
    for (let i = 0; i < answers.length; i++) {
      const count = await this.manager.query(
        `SELECT COUNT(*) FROM public."answer_upvote" WHERE public."answer_upvote"."answerId"=${answers[i].id}`,
      );
      answers[i]['upvotesCount'] = await parseInt(count[0]['count']);
    }
    return answers;
  }

  async findStatsMonthly(): Promise<any> {
    return this.manager.query(
      `SELECT to_char(public."answer"."created_at", 'YYYY-MM') as month,
                    COUNT(*) as answers
               FROM public."answer"
               GROUP BY month`,
    );
  }

  async findStatsDaily(): Promise<any> {
    return this.manager.query(
      `SELECT to_char(public."answer"."created_at", 'FMDay') as day,
                    COUNT(*) as answers
              FROM public."answer"
              GROUP BY day`,
    );
  }
}
