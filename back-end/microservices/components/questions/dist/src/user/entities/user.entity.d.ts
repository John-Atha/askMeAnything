import { Question } from '../../question/entities/question.entity';
import { QuestionUpvote } from '../../question-upvote/entities/question-upvote.entity';
export declare class User {
    id: number;
    questions: Question[];
    question_upvotes: QuestionUpvote[];
}
