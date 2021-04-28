import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Question } from '../../question/entities/question.entity';
import { Answer } from '../../answer/entities/answer.entity';
import { QuestionUpvote } from '../../question-upvote/entities/question-upvote.entity';
import { Exclude } from 'class-transformer';
import {AnswerUpvote} from "../../answer-upvote/entities/answer-upvote.entity";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column({ unique: true })
  username: string;

  @Exclude()
  @Column()
  password: string;

  @Exclude()
  @Column({ nullable: true })
  date_of_birth: Date;

  @Column({ default: 0 })
  points: number;

  @Exclude()
  @Column({ nullable: true })
  bio: string;

  @Exclude()
  @Column({ nullable: true })
  site_url: string;

  @Exclude()
  @Column({ nullable: true })
  github_username: string;

  @Exclude()
  @Column({ nullable: true })
  first_name: string;

  @Exclude()
  @Column({ nullable: true })
  last_name: string;

  @Exclude()
  @CreateDateColumn()
  member_since: Date;

  @OneToMany((type) => Question, (question) => question.owner)
  questions: Question[];

  @OneToMany((type) => Answer, (answer) => answer.owner)
  answers: Answer[];

  @OneToMany((type) => QuestionUpvote, (upvote) => upvote.owner)
  question_upvotes: QuestionUpvote[];

  @OneToMany((type) => AnswerUpvote, (upvote) => upvote.owner)
  answer_upvotes: AnswerUpvote[];
}
