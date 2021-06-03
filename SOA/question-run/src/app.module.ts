import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AnswerModule } from './answer/answer.module';
import { QuestionUpvoteModule } from './question-upvote/question-upvote.module';
import { AnswerUpvoteModule } from './answer-upvote/answer-upvote.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    AnswerModule,
    QuestionUpvoteModule,
    AnswerUpvoteModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
