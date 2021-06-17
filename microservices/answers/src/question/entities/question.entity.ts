import {
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
  } from 'typeorm';
  import { User } from '../../user/entities/user.entity';
  import { Answer } from 'src/answer/entities/answer.entity';
  
  @Entity()
  export class Question {
    @PrimaryGeneratedColumn()
    id: number;
  
    @ManyToOne(() => User, (user) => user.questions, {
      nullable: false,
      onDelete: 'CASCADE',
    })
    owner: User;
  
    @OneToMany((type) => Answer, (answer) => answer.question)
    answers: Answer[];
  
  }
  