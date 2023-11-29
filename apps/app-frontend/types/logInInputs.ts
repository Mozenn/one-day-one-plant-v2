import { AuthFormInputs } from "./authFormInputs";

export interface LogInInputs extends AuthFormInputs {
  emailOrUsername: string;
  password: string;
}
