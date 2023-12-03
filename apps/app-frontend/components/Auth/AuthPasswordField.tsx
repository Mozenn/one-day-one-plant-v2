import { AuthFormInputs } from "@/types/authFormInputs";
import { UseControllerProps, useController } from "react-hook-form";
import AuthFieldError from "./AuthFieldError";
import AuthFieldLabel from "./AuthFieldLabel";
import { useState } from "react";
import { AuthFieldProps } from "./AuthFieldProps";

const AuthPasswordField = <T extends AuthFormInputs>(
  props: AuthFieldProps<T>
) => {
  const { field, fieldState } = useController(props.useControllerProps);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  return (
    <>
      <AuthFieldLabel
        name={props.useControllerProps.name}
        label={props.label}
      />
      <div className='flex items-center w-3/4'>
        <input
          className={`border-solid ${
            fieldState.error ? "border-danger" : "border-primary-dark"
          } border-2 rounded-2xl px-2 w-full text-secondary-dark
          mr-2
          `}
          placeholder={props.useControllerProps.name}
          {...field}
          type={`${isVisible ? "text" : "password"}`}
        />
        <button
          onClick={() => setIsVisible((prevState) => !prevState)}
          className=' bg-primary p-2 rounded-xl hover:bg-primary-dark transition-colors duration-200
          active:bg-primary-light'
        >
          <img
            src={`/images/icons/eye${isVisible ? "-off" : ""}.svg`}
            alt='toogle password visibility icon'
            className='filter-white'
          />
        </button>
      </div>

      <AuthFieldError fieldState={fieldState} />
    </>
  );
};

export default AuthPasswordField;
