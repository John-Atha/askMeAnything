import { Injectable } from '@nestjs/common';
import { CreateAnswerUpvoteDto } from './dto/create-answer-upvote.dto';

@Injectable()
export class AnswerUpvoteService {
  create(createAnswerUpvoteDto: CreateAnswerUpvoteDto) {
    return 'This action adds a new answerUpvote';
  }

  findAll() {
    return `This action returns all answerUpvote`;
  }

  findOne(id: number) {
    return `This action returns a #${id} answerUpvote`;
  }

  remove(id: number) {
    return `This action removes a #${id} answerUpvote`;
  }
}
