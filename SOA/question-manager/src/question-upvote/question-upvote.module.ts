import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuestionUpvote } from './entities/question-upvote.entity';

@Module({
  imports: [TypeOrmModule.forFeature([QuestionUpvote])],
})
export class QuestionUpvoteModule {}
