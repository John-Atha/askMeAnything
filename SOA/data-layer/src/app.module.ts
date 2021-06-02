import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { QuestionModule } from './question/question.module';
import { AnswerModule } from './answer/answer.module';
import { KeywordModule } from './keyword/keyword.module';
import { QuestionUpvoteModule } from './question-upvote/question-upvote.module';
import { AnswerUpvoteModule } from './answer-upvote/answer-upvote.module';
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      keepConnectionAlive: true,
    }),
    UserModule,
    QuestionModule,
    AnswerModule,
    KeywordModule,
    QuestionUpvoteModule,
    AnswerUpvoteModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
