import {
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { Answer } from '../../answer/entities/answer.entity';

@Entity()
export class AnswerUpvote {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  created_at: Date;

  @ManyToOne(() => User, (user) => user.answer_upvotes, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  owner: User;

  @ManyToOne(() => Answer, (answer) => answer.upvotes, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  answer: Answer;
}
