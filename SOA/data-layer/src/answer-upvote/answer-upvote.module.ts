import { Module } from '@nestjs/common';
import { AnswerUpvoteService } from './answer-upvote.service';
import { AnswerUpvoteController } from './answer-upvote.controller';

@Module({
  controllers: [AnswerUpvoteController],
  providers: [AnswerUpvoteService]
})
export class AnswerUpvoteModule {}
