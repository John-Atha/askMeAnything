import {
  IsDate,
  IsDefined,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';

export class ChoreoObjectDto {
  @IsNumber()
  @IsDefined()
  @IsNotEmpty()
  readonly id: number;

  @IsString()
  @IsDefined()
  @IsNotEmpty()
  readonly action: string;

  @IsNumber()
  @IsDefined()
  @IsNotEmpty()
  readonly entryId: number;
  
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  readonly src: string;

  @IsString()
  @IsDefined()
  @IsNotEmpty()
  readonly targetEntity: string;

  @IsString()
  @IsNotEmpty()
  @IsDefined()
  readonly timestamp: string;

  @IsNotEmpty()
  @IsDefined()
  readonly object: any;
}
