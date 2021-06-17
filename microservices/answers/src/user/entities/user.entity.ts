import {
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
  } from 'typeorm';
  import { Question } from '../../question/entities/question.entity';
  import { Answer } from '../../answer/entities/answer.entity';
  import {AnswerUpvote} from "../../answer-upvote/entities/answer-upvote.entity";
  
  @Entity()
  export class User {
    @PrimaryGeneratedColumn()
    id: number;
  
    @OneToMany((type) => Question, (question) => question.owner)
    questions: Question[];
  
    @OneToMany((type) => Answer, (answer) => answer.owner)
    answers: Answer[];
  
    @OneToMany((type) => AnswerUpvote, (upvote) => upvote.owner)
    answer_upvotes: AnswerUpvote[];
  }