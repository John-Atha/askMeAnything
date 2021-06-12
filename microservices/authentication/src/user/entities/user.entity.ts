import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
  } from 'typeorm';
  import { Exclude } from 'class-transformer';
  
  @Entity()
  export class User {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ unique: true })
    email: string;
  
    @Column({ unique: true })
    username: string;
  
    @Exclude({ toPlainOnly: true })
    @Column()
    password: string;
  
    //@Exclude()
    @Column({ nullable: true })
    date_of_birth: Date;
  
    @Column({ default: 0 })
    points: number;
  
    //@Exclude()
    @Column({ nullable: true })
    bio: string;
  
    //@Exclude()
    @Column({ nullable: true })
    site_url: string;
  
    //@Exclude()
    @Column({ nullable: true })
    github_username: string;
  
    //@Exclude()
    @Column({ nullable: true })
    first_name: string;
  
    //@Exclude()
    @Column({ nullable: true })
    last_name: string;
  
    //@Exclude()
    @CreateDateColumn()
    member_since: Date;
  }