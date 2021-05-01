import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { QuestionModule } from './question/question.module';
import { AnswerModule } from './answer/answer.module';
import { QuestionUpvoteModule } from './question-upvote/question-upvote.module';
import { AnswerUpvoteModule } from './answer-upvote/answer-upvote.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    UserModule,
    TypeOrmModule.forRoot(),
    QuestionModule,
    AnswerModule,
    QuestionUpvoteModule,
    AnswerUpvoteModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
