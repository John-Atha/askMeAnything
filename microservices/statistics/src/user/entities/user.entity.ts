import {
    Column,
    CreateDateColumn,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
  } from 'typeorm';
  import { Question } from '../../question/entities/question.entity';
  import { Answer } from '../../answer/entities/answer.entity';
  
  @Entity()
  export class User {
    @PrimaryGeneratedColumn()
    id: number;
  
    @OneToMany((type) => Question, (question) => question.owner)
    questions: Question[];
  
    @OneToMany((type) => Answer, (answer) => answer.owner)
    answers: Answer[];
  }