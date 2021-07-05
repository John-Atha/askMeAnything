import { User } from '../../user/entities/user.entity';
import { Answer } from 'src/answer/entities/answer.entity';
import { Keyword } from '../../keyword/entities/keyword.entity';
export declare class Question {
    id: number;
    title: string;
    text: string;
    created_at: Date;
    updated_at: Date;
    owner: User;
    answers: Answer[];
    keywords: Keyword[];
}
