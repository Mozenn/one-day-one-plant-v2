import { IsNotEmpty } from 'class-validator';

export class SignInGoogleDto {
  @IsNotEmpty()
  token: string;
}
