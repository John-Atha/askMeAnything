import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuestionModule } from './question/question.module';

@Module({
  imports: [UserModule, TypeOrmModule.forRoot(), QuestionModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
