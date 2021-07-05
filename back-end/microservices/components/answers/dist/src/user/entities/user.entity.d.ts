import { Question } from '../../question/entities/question.entity';
import { Answer } from '../../answer/entities/answer.entity';
import { AnswerUpvote } from "../../answer-upvote/entities/answer-upvote.entity";
export declare class User {
    id: number;
    questions: Question[];
    answers: Answer[];
    answer_upvotes: AnswerUpvote[];
}
