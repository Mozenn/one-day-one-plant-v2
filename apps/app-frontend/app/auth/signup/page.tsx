"use client";

import useAuth from "@/hooks/useAuth";
import { AuthFieldData } from "@/types/authFieldData";
import AuthForm from "@/components/Auth/AuthForm";
import { AuthFormInputs } from "@/types/authFormInputs";
import { DefaultValues } from "react-hook-form";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";

interface SignUpFieldData extends AuthFieldData {
  name: "password" | "email" | "username";
}

interface SignUpFormInputs extends AuthFormInputs {
  email: string;
  username: string;
}

const SignUp = () => {
  const { register, signInWithGoogle } = useAuth();

  const defaultValues: DefaultValues<SignUpFormInputs> = {
    email: "",
    username: "",
    password: "",
  };

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

  return (
    <GoogleOAuthProvider
      clientId={process.env.NEXT_PUBLIC_GOOGLE_AUTH_CLIENT_ID || ""}
    >
      <AuthForm
        title="Sign Up to One Day One Plant"
        submitLabel="Sign Up"
        authFields={authFields}
        defaultValues={defaultValues}
        onSubmit={register}
        footerLink={{
          route: "/auth/login",
          text: "Already have an account ? Log in here",
        }}
        googleAuthProps={{
          onSuccess: (credentialResponse) => {
            return (
              credentialResponse.credential &&
              signInWithGoogle(credentialResponse.credential, true)
            );
          },
          onError: () => {
            console.log("SignUp Failed");
          },
          text: "signup_with",
          useOneTap: false,
        }}
      />
    </GoogleOAuthProvider>
  );
};

export default SignUp;
