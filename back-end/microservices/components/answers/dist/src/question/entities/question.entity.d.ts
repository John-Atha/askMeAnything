import { User } from '../../user/entities/user.entity';
import { Answer } from 'src/answer/entities/answer.entity';
export declare class Question {
    id: number;
    owner: User;
    answers: Answer[];
}
