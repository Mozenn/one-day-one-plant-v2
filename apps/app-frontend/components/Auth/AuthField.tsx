import { AuthFormInputs } from "@/types/authFormInputs";
import { UseControllerProps, useController } from "react-hook-form";
import AuthFieldError from "./AuthFieldError";
import AuthFieldLabel from "./AuthFieldLabel";

const AuthField = <T extends AuthFormInputs>(props: UseControllerProps<T>) => {
  const { field, fieldState } = useController(props);

  return (
    <>
      <AuthFieldLabel name={props.name} />
      <input
        className={`border-solid ${
          fieldState.error ? "border-danger" : "border-primary-dark"
        } border-2 rounded-2xl px-2 w-3/4 text-secondary-dark`}
        placeholder={props.name}
        {...field}
        type='text'
      />
      <AuthFieldError fieldState={fieldState} />
    </>
  );
};

export default AuthField;
