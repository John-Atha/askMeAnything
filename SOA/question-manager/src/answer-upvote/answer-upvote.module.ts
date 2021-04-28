import { Module } from '@nestjs/common';
import { AnswerUpvote } from './entities/answer-upvote.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([AnswerUpvote])],
})
export class AnswerUpvoteModule {}
