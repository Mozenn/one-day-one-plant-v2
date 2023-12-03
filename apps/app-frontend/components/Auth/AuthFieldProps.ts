import { AuthFormInputs } from "@/types/authFormInputs";
import { UseControllerProps } from "react-hook-form";

export interface AuthFieldProps<T extends AuthFormInputs> {
  label: string;
  useControllerProps: UseControllerProps<T>;
}
