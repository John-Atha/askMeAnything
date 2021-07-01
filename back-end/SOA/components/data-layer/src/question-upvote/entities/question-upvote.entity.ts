import {
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { Question } from '../../question/entities/question.entity';

@Entity()
export class QuestionUpvote {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  created_at: Date;

  @ManyToOne(() => User, (user) => user.question_upvotes, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  owner: User;

  @ManyToOne(() => Question, (question) => question.upvotes, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  question: Question;
}
