import { Module } from '@nestjs/common';
import { Question } from './entities/question.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Question])],
})
export class QuestionModule {}
