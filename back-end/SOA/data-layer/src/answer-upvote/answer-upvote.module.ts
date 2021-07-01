import { Module } from '@nestjs/common';
import { AnswerUpvoteService } from './answer-upvote.service';
import { AnswerUpvoteController } from './answer-upvote.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnswerUpvote } from './entities/answer-upvote.entity';
@Module({
  imports: [TypeOrmModule.forFeature([AnswerUpvote])],
  controllers: [AnswerUpvoteController],
  providers: [AnswerUpvoteService]
})
export class AnswerUpvoteModule {}
