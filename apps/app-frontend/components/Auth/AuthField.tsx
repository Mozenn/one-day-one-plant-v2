import { AuthFormInputs } from "@/types/authFormInputs";
import { useController } from "react-hook-form";
import AuthFieldError from "./AuthFieldError";
import AuthFieldLabel from "./AuthFieldLabel";
import { AuthFieldProps } from "./AuthFieldProps";

const AuthField = <T extends AuthFormInputs>(props: AuthFieldProps<T>) => {
  const { field, fieldState } = useController(props.useControllerProps);

  return (
    <>
      <AuthFieldLabel
        name={props.useControllerProps.name}
        label={props.label}
      />
      <input
        className={`border-solid ${
          fieldState.error ? "border-danger" : "border-primary-dark"
        } border-2 rounded-2xl px-2 w-3/4 text-secondary-dark`}
        placeholder={props.label}
        {...field}
        type='text'
      />
      <AuthFieldError fieldState={fieldState} />
    </>
  );
};

export default AuthField;
