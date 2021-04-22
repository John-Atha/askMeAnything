export class CreateUserDto {
  readonly username: string;
  readonly email: string;
  readonly password: string;
  readonly confirmation: string;
  readonly date_of_birth: Date;
  readonly bio: string;
  readonly site_url: string;
  readonly github_username: string;
  readonly first_name: string;
  readonly last_name: string;
}
