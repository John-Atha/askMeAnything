import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { Answer } from 'src/answer/entities/answer.entity';
import { QuestionUpvote } from '../../question-upvote/entities/question-upvote.entity';

@Entity()
export class Question {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  title: string;

  @Column()
  text: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => User, (user) => user.questions, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  owner: User;

  @OneToMany((type) => Answer, (answer) => answer.question)
  answers: Answer[];

  @OneToMany((type) => QuestionUpvote, (upvote) => upvote.question)
  upvotes: QuestionUpvote[];
}
