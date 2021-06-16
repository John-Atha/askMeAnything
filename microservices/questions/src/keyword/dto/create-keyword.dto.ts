import {
    IsDefined,
    IsNotEmpty,
    IsString,
    MaxLength,
    MinLength,
  } from 'class-validator';
  
  export class CreateKeywordDto {
    @MinLength(2)
    @MaxLength(30)
    @IsString()
    @IsNotEmpty()
    @IsDefined()
    readonly name: string;
  }
  