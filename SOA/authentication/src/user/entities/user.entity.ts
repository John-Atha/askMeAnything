import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column({ unique: true })
  username: string;

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

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @CreateDateColumn()
  member_since: Date;
}