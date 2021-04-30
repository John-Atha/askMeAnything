import { Module } from '@nestjs/common';
import { Answer } from './entities/answer.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnswerController } from './answer.controller';
import { AnswerService } from './answer.service';

@Module({
  imports: [TypeOrmModule.forFeature([Answer])],
  controllers: [AnswerController],
  providers: [AnswerService],
})
export class AnswerModule {}
