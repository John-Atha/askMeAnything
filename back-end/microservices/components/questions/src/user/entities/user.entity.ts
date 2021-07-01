import {
    Column,
    CreateDateColumn,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
  } from 'typeorm';
  import { Question } from '../../question/entities/question.entity';
  import { QuestionUpvote } from '../../question-upvote/entities/question-upvote.entity';
  
  @Entity()
  export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToMany((type) => Question, (question) => question.owner)
    questions: Question[];
  
    @OneToMany((type) => QuestionUpvote, (upvote) => upvote.owner)
    question_upvotes: QuestionUpvote[];
  
  }