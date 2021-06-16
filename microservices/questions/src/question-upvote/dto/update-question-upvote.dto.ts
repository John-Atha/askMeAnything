import { PartialType } from '@nestjs/mapped-types';
import { CreateQuestionUpvoteDto } from './create-question-upvote.dto';

export class UpdateQuestionUpvoteDto extends PartialType(CreateQuestionUpvoteDto) {}
