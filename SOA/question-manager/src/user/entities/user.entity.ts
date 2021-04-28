import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Question } from '../../question/entities/question.entity';
import { Answer } from '../../answer/entities/answer.entity';
import { Exclude } from 'class-transformer';

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

  @Column({ nullable: true })
  date_of_birth: Date;

  @Column({ default: 0 })
  points: number;

  @Column({ nullable: true })
  bio: string;

  @Column({ nullable: true })
  site_url: string;

  @Column({ nullable: true })
  github_username: string;

  @Column({ nullable: true })
  first_name: string;

  @Column({ nullable: true })
  last_name: string;

  @CreateDateColumn()
  member_since: Date;

  @OneToMany((type) => Question, (question) => question.owner)
  questions: Question[];

  @OneToMany((type) => Answer, (answer) => answer.owner)
  answers: Answer[];
}
