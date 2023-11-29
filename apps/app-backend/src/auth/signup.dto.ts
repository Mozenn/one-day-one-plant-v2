import { MinLength, IsEmail } from 'class-validator';

export class SignUpDto {
  @MinLength(2)
  username: string;
  @IsEmail()
  email: string;
  @MinLength(8)
  password: string;
}
