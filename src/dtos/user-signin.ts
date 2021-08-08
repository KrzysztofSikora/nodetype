import { IsEmail, IsString } from 'class-validator';

export class CreateUserSignInDto {
  @IsEmail()
  public email: string;

  @IsString()
  public password: string;
}
