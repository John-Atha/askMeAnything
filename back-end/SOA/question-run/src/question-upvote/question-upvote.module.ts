import { Module } from '@nestjs/common';
import { QuestionUpvoteService } from './question-upvote.service';
import { QuestionUpvoteController } from './question-upvote.controller';

@Module({
  controllers: [QuestionUpvoteController],
  providers: [QuestionUpvoteService],
})
export class QuestionUpvoteModule {}
