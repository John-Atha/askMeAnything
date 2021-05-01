import {BadRequestException, Injectable, NotFoundException, UnauthorizedException} from '@nestjs/common';
import { CreateQuestionUpvoteDto } from './dto/create-question-upvote.dto';
import {InjectEntityManager} from "@nestjs/typeorm";
import {EntityManager} from "typeorm";
import {verify} from "../../general-methods/methods";
import {User} from "../user/entities/user.entity";
import {Question} from "../question/entities/question.entity";
import {QuestionUpvote} from "./entities/question-upvote.entity";

@Injectable()
export class QuestionUpvoteService {
  constructor(@InjectEntityManager() private manager: EntityManager) {}

  async create(req, createQuestionUpvoteDto: CreateQuestionUpvoteDto): Promise<QuestionUpvote> {
    return this.manager.transaction(async (manager) => {
      const user_id = verify(req);
      const user = await manager.findOne(User, user_id);
      if (!user) {
        throw new UnauthorizedException();
      }
      const question_id = createQuestionUpvoteDto.question.id;
      const question = await manager.findOne(Question, question_id, { relations: ['owner'] });
      if (!question) {
        throw new NotFoundException(`Question '${question_id}' not found.`);
      }
      const upvote = await manager.create(QuestionUpvote, createQuestionUpvoteDto);
      upvote.owner = user;
      upvote.question = question;
      return manager.save(upvote);
    });
  }

  async remove(req, id: number) {
    return this.manager.transaction(async (manager) => {
      const user_id = verify(req);
      const user = await manager.findOne(User, user_id);
      if (!user) {
        throw new UnauthorizedException();
      }
      const upvote = await manager.findOne(QuestionUpvote, id, { relations: ['owner'] });
      if (!upvote) {
        throw new NotFoundException(`Upvote '${id}' not found.`);
      }
      if (user.id !== upvote.owner.id) {
        throw new BadRequestException(`Only the upvote's owner can delete it.`);
      }
      console.log(`I am deleting upvote with id=${id}.`);
      return manager.delete(QuestionUpvote, id);
    });
  }
}
