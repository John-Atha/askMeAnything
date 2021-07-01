import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { QuestionModule } from './question/question.module';
import { UserModule } from './user/user.module';
import { QuestionUpvoteModule } from './question-upvote/question-upvote.module';
import { KeywordModule } from './keyword/keyword.module';
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  imports: [    
    TypeOrmModule.forRoot({
      keepConnectionAlive: true,
    }),
    QuestionModule,
    UserModule,
    QuestionUpvoteModule,
    KeywordModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
