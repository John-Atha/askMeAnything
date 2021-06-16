import {
    Column,
    CreateDateColumn,
    Entity, JoinTable, ManyToMany,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
  } from 'typeorm';
  import { User } from '../../user/entities/user.entity';
  import { QuestionUpvote } from '../../question-upvote/entities/question-upvote.entity';
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
  
    @OneToMany((type) => QuestionUpvote, (upvote) => upvote.question)
    upvotes: QuestionUpvote[];
  
    @ManyToMany((type) => Keyword, (keyword) => keyword.questions, {
      cascade: true,
    })
    @JoinTable()
    keywords: Keyword[];
  }
  