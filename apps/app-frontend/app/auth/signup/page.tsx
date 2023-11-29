"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import AuthField from "@/components/Auth/AuthField";
import { SignUpInputs } from "../../../types/signUpInputs";
import AuthPasswordField from "@/components/Auth/AuthPasswordField";

type SignUpFieldData = {
  name: "password" | "email" | "username";
  rules: any;
};

const SignUp = () => {
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<SignUpInputs>();

  const authFields: SignUpFieldData[] = [
    {
      name: "email",
      rules: {
        required: {
          value: true,
          message: "Email required",
        },
        pattern: {
          value: /\S+@\S+\.\S+/,
          message: "Entered value does not match email format",
        },
      },
    },
    {
      name: "username",
      rules: {
        required: {
          value: true,
          message: "Username required",
        },
        pattern: {
          value: /^[A-Za-z0-9_-]+$/i,
          message: "Invalid username",
        },
      },
    },
    {
      name: "password",
      rules: {
        required: {
          value: true,
          message: "Password required",
        },
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
      },
    },
  ];

  const formDisabled = () =>
    errors.email !== undefined ||
    errors.password !== undefined ||
    errors.username !== undefined;

  const onSubmit: SubmitHandler<SignUpInputs> = (data) => {
    console.log(data);
    // TODO Handle error with message shown above submit button and implement useAuth
    fetch(`${process.env.NEXT_PUBLIC_API_URL}auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  };

  return (
    <main
      className='flex flex-col items-center flex-1 m-0 min-h-[80vh] py-28 px-0'
      role='main'
    >
      <div className='flex items-center flex-col w-2/5 border-solid border-primary-dark border-8 rounded-3xl p-12'>
        <img
          className='h-[12rem] w-auto absolute top-28'
          src='/images/logo.png'
          alt='Logo'
        />
        <h2 className='text-3xl font-bold mt-16 mb-8'>
          Sign Up to One Day One Plant
        </h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='flex items-center flex-col w-3/4'
        >
          {authFields.map((fieldData) =>
            fieldData.name === "password" ? (
              <AuthPasswordField
                key={fieldData.name}
                name={fieldData.name}
                control={control}
                rules={fieldData.rules}
              />
            ) : (
              <AuthField
                key={fieldData.name}
                name={fieldData.name}
                control={control}
                rules={fieldData.rules}
              />
            )
          )}
          <input
            type='submit'
            value='Sign Up'
            className={`globalButton !mt-8 ${
              formDisabled() ? "globalButtonDisabled" : ""
            }`}
            disabled={formDisabled()}
          />
        </form>
      </div>
    </main>
  );
};

export default SignUp;
