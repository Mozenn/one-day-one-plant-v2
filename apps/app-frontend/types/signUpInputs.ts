import { AuthFormInputs } from "./authFormInputs";

export interface SignUpInputs extends AuthFormInputs {
  email: string;
  username: string;
  password: string;
}
