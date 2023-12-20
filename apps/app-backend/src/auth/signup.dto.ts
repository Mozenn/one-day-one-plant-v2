import { MinLength, IsEmail, Matches } from 'class-validator';

export class SignUpDto {
  @MinLength(2)
  @Matches(/^[A-Za-z0-9_-]+$/)
  username: string;
  @IsEmail()
  email: string;
  @MinLength(8)
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
  )
  password: string;
}
