import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
  } from 'typeorm';
  import { User } from '../../user/entities/user.entity';
  import { Question } from '../../question/entities/question.entity';
  
  @Entity()
  export class Answer {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    text: string;
  
    @CreateDateColumn()
    created_at: Date;
  
    @UpdateDateColumn()
    updated_at: Date;
  
    @ManyToOne(() => User, (user) => user.answers, {
      nullable: false,
      onDelete: 'CASCADE',
    })
    owner: User;
  
    @ManyToOne(() => Question, (question) => question.answers, {
      nullable: false,
      onDelete: 'CASCADE',
    })
    question: Question;
  
  }
  