import { Injectable } from '@nestjs/common';
import { CreateQuestionUpvoteDto } from './dto/create-question-upvote.dto';

@Injectable()
export class QuestionUpvoteService {
  create(createQuestionUpvoteDto: CreateQuestionUpvoteDto) {
    return 'This action adds a new questionUpvote';
  }

  remove(id: number) {
    return `This action removes a #${id} questionUpvote`;
  }
}
