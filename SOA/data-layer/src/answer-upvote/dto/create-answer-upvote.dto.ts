import { IsDefined, IsNotEmpty, ValidateNested } from 'class-validator';
import { ObjectWithId } from '../../validation';
import { Type } from 'class-transformer';

export class CreateAnswerUpvoteDto {
  @IsDefined()
  @ValidateNested()
  @Type(() => ObjectWithId)
  readonly answer: ObjectWithId;
}
