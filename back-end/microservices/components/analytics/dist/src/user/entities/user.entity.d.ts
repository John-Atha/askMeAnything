import { Question } from '../../question/entities/question.entity';
import { Answer } from '../../answer/entities/answer.entity';
export declare class User {
    id: number;
    questions: Question[];
    answers: Answer[];
}
