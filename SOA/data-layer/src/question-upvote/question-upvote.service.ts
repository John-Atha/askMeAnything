import {
  Injectable,
} from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { User } from '../user/entities/user.entity';
import { Question } from '../question/entities/question.entity';
import { QuestionUpvote } from './entities/question-upvote.entity';

@Injectable()
export class QuestionUpvoteService {
  constructor(@InjectEntityManager() private manager: EntityManager) {}

  async findOne(params: any): Promise<any> {
    let upvote = null;
    if (params.id) {
      let relations = [];
      if (params.owner) relations.push('owner');
      if (params.question) relations.push('question');
      if (params.questionOwner) relations.push('question.owner');
      upvote = await this.manager.findOne(QuestionUpvote, params.id, { relations });
    }
    return upvote;
  }

  async create(createQuestionUpvoteDto: any): Promise<QuestionUpvote> {
    return this.manager.transaction(async (manager) => {
      const user_id = await createQuestionUpvoteDto.owner.id;
      const user = await manager.findOne(User, user_id);
      console.log(`user:`)
      console.log(user);
      const question_id = createQuestionUpvoteDto.question.id;
      const question = await manager.findOne(Question, question_id, { relations: ['owner'] });
      console.log(`question:`);
      console.log(question);
      const upvote = await manager.create(QuestionUpvote, createQuestionUpvoteDto);
      console.log('upvote:');
      console.log(upvote);
      upvote.owner = user;
      upvote.question = question;
      const owner = question.owner;
      owner.points++;
      await manager.save(owner);
      return manager.save(upvote);
    });
  }

  async remove(id: number) {
    return this.manager.transaction(async (manager) => {
      const upvote = await manager.findOne(QuestionUpvote, id, {
        relations: ['owner', 'question', 'question.owner'],
      });
      const question = upvote.question;
      const owner = question.owner;
      if (owner.points) owner.points--;
      await manager.save(owner);
      return manager.delete(QuestionUpvote, id);
    });
  }

  async validateCreate(user: User, question: Question): Promise<boolean> {
    const upvotes = await this.manager.find(QuestionUpvote, { owner: user, question: question });
    return !upvotes.length;
  }
}
