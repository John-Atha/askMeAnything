import {
    IsDefined,
    IsNotEmpty,
    IsString,
    MaxLength,
    MinLength,
  } from 'class-validator';
  
  export class CreateQuestionDto {
    @MinLength(4)
    @MaxLength(40)
    @IsString()
    @IsDefined()
    @IsNotEmpty()
    readonly title: string;
  
    @MaxLength(1000)
    @IsNotEmpty()
    @IsDefined()
    @IsString()
    readonly text: string;
  }
  