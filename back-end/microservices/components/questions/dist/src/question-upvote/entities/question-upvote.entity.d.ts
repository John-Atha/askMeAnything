import { User } from '../../user/entities/user.entity';
import { Question } from '../../question/entities/question.entity';
export declare class QuestionUpvote {
    id: number;
    created_at: Date;
    owner: User;
    question: Question;
}
