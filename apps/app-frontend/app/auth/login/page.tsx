import { SubmitHandler, useForm } from "react-hook-form";

type LoginInputs = {
  emailOrUsername: string;
  password: string;
};

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInputs>();
  const onSubmit: SubmitHandler<LoginInputs> = (data) => console.log(data);

  return (
    <main
      className='flex flex-col items-center flex-1 m-0 min-h-[80vh] py-20 px-0'
      role='main'
    >
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            defaultValue='email or username'
            {...register("emailOrUsername", {
              required: true,
              pattern: {
                value: /^\S+@\S+\.\S+|[A-Za-z0-9_-]+$/i,
                message:
                  "Entered value does not match email or username format",
              },
            })}
          />
          {errors.emailOrUsername && (
            <span role='alert'>{errors.emailOrUsername.message}</span>
          )}
          <input
            {...register("password", {
              required: true,
              minLength: {
                value: 8,
                message: "Password length must be above 8 characters",
              },
              maxLength: {
                value: 128,
                message: "Password length must be below 128 characters",
              },
              pattern: {
                value:
                  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/i,
                message:
                  "Password must contains at least one uppercase letter, one lowercase letter, one number and one special character",
              },
            })}
          />
          {errors.password && (
            <span role='alert'>{errors.password.message}</span>
          )}
          <input type='submit' />
        </form>
      </div>
    </main>
  );
};

export default Login;
