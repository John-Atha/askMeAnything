import { User } from '../../user/entities/user.entity';
import { Question } from '../../question/entities/question.entity';
export declare class Answer {
    id: number;
    text: string;
    created_at: Date;
    updated_at: Date;
    owner: User;
    question: Question;
}
