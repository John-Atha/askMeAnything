import {
    IsDefined,
    IsNotEmpty,
    IsString,
    MaxLength,
} from 'class-validator';
  
  export class CreateKeywordDto {
    @MaxLength(50)
    @IsString()
    @IsNotEmpty()
    @IsDefined()
    readonly name: string;
  }
  