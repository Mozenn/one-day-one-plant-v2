import { ControllerFieldState } from "react-hook-form";

const AuthFieldError = ({
  fieldState,
}: {
  fieldState: ControllerFieldState;
}) => {
  return (
    <>
      {fieldState.error && (
        <span role='alert' className='text-danger mt-1 '>
          {fieldState.error.message}
        </span>
      )}
    </>
  );
};

export default AuthFieldError;
