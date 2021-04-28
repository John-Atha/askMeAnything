import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuestionModule } from './question/question.module';
import { AnswerModule } from './answer/answer.module';

@Module({
  imports: [UserModule, TypeOrmModule.forRoot(), QuestionModule, AnswerModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
