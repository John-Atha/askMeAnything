import {
  IsDefined,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ObjectWithId } from '../../validation';
import { User } from '../../user/entities/user.entity';

export class CreateQuestionDto {
  @MinLength(4)
  @MaxLength(40)
  @IsString()
  @IsNotEmpty()
  readonly title: string;

  @MaxLength(1000)
  @IsNotEmpty()
  @IsString()
  readonly text: string;

  @IsDefined()
  @ValidateNested()
  @Type(() => ObjectWithId)
  readonly owner: ObjectWithId;
}
