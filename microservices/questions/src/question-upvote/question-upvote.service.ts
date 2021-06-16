import { Injectable } from '@nestjs/common';
import { CreateQuestionUpvoteDto } from './dto/create-question-upvote.dto';
import { UpdateQuestionUpvoteDto } from './dto/update-question-upvote.dto';

@Injectable()
export class QuestionUpvoteService {
  create(createQuestionUpvoteDto: CreateQuestionUpvoteDto) {
    return 'This action adds a new questionUpvote';
  }

  findAll() {
    return `This action returns all questionUpvote`;
  }

  findOne(id: number) {
    return `This action returns a #${id} questionUpvote`;
  }

  update(id: number, updateQuestionUpvoteDto: UpdateQuestionUpvoteDto) {
    return `This action updates a #${id} questionUpvote`;
  }

  remove(id: number) {
    return `This action removes a #${id} questionUpvote`;
  }
}
