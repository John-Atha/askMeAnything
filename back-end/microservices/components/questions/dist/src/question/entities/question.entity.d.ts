import { User } from '../../user/entities/user.entity';
import { QuestionUpvote } from '../../question-upvote/entities/question-upvote.entity';
import { Keyword } from '../../keyword/entities/keyword.entity';
export declare class Question {
    id: number;
    title: string;
    text: string;
    created_at: Date;
    updated_at: Date;
    owner: User;
    upvotes: QuestionUpvote[];
    keywords: Keyword[];
}
