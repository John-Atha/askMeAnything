import {
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @MinLength(4)
  @MaxLength(40)
  @IsString()
  @IsNotEmpty()
  readonly username: string;

  @MaxLength(70)
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @MinLength(10)
  @MaxLength(30)
  @IsString()
  @IsNotEmpty()
  readonly password: string;

  @MinLength(10)
  @MaxLength(30)
  @IsString()
  @IsNotEmpty()
  readonly confirmation: string;

  @IsDate()
  @IsOptional()
  readonly date_of_birth: Date;

  @MaxLength(500)
  @IsString()
  @IsOptional()
  readonly bio: string;

  @IsUrl()
  @IsOptional()
  readonly site_url: string;

  @IsString()
  @IsOptional()
  readonly github_username: string;

  @IsString()
  @IsOptional()
  readonly first_name: string;

  @IsString()
  @IsOptional()
  readonly last_name: string;
}
