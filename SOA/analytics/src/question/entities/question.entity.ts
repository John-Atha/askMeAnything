import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { Answer } from '../../answer/entities/answer.entity';
import { Keyword } from '../../keyword/entities/keyword.entity';

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

  @ManyToMany((type) => Keyword, (keyword) => keyword.questions, {
    cascade: true,
  })
  @JoinTable()
  keywords: Keyword[];
}
