import { Module } from '@nestjs/common';
import { QuestionUpvoteService } from './question-upvote.service';
import { QuestionUpvoteController } from './question-upvote.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuestionUpvote } from './entities/question-upvote.entity';

@Module({
  imports: [TypeOrmModule.forFeature([QuestionUpvote])],
  controllers: [QuestionUpvoteController],
  providers: [QuestionUpvoteService],
})
export class QuestionUpvoteModule {}
