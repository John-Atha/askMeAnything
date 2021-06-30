import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { QuestionModule } from './question/question.module';
import { AnswerModule } from './answer/answer.module';
import { KeywordModule } from './keyword/keyword.module';

@Module({
  imports: [QuestionModule, AnswerModule, KeywordModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
