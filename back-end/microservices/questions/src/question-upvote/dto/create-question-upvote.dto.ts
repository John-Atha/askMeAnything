import { IsDefined, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ObjectWithId } from '../../validation';

export class CreateQuestionUpvoteDto {
  @IsDefined()
  @ValidateNested()
  @Type(() => ObjectWithId)
  readonly question: ObjectWithId;
}
