import { Question } from '../../question/entities/question.entity';
import { Answer } from '../../answer/entities/answer.entity';
import { QuestionUpvote } from '../../question-upvote/entities/question-upvote.entity';
import { AnswerUpvote } from "../../answer-upvote/entities/answer-upvote.entity";
export declare class User {
    id: number;
    email: string;
    username: string;
    password: string;
    date_of_birth: Date;
    points: number;
    bio: string;
    site_url: string;
    github_username: string;
    first_name: string;
    last_name: string;
    member_since: Date;
    questions: Question[];
    answers: Answer[];
    question_upvotes: QuestionUpvote[];
    answer_upvotes: AnswerUpvote[];
}
