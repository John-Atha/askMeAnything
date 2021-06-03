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
}
