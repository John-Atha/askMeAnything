import { Injectable } from '@nestjs/common';
import { CreateAnswerUpvoteDto } from './dto/create-answer-upvote.dto';

@Injectable()
export class AnswerUpvoteService {
  create(createAnswerUpvoteDto: CreateAnswerUpvoteDto) {
    return 'This action adds a new answerUpvote';
  }

  remove(id: number) {
    return `This action removes a #${id} answerUpvote`;
  }
}
