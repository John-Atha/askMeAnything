import { Type } from 'class-transformer';
import {
  IsDefined,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { ObjectWithId } from '../../validation';

export class CreateAnswerDto {
  @MinLength(10)
  @MaxLength(2000)
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  readonly text: string;

  @IsDefined()
  @ValidateNested()
  @Type(() => ObjectWithId)
  readonly question: ObjectWithId;
}
