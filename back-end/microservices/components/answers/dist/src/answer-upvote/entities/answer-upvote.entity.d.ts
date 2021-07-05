import { User } from '../../user/entities/user.entity';
import { Answer } from '../../answer/entities/answer.entity';
export declare class AnswerUpvote {
    id: number;
    created_at: Date;
    owner: User;
    answer: Answer;
}
