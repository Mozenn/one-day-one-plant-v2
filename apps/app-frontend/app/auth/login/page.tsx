"use client";

import AuthForm from "@/components/Auth/AuthForm";
import useAuth from "@/hooks/useAuth";
import { AuthFieldData } from "@/types/authFieldData";
import { AuthFormInputs } from "@/types/authFormInputs";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import { DefaultValues } from "react-hook-form";
interface LogInFieldData extends AuthFieldData {
  name: "password" | "emailOrUsername";
}

interface LogInFormInputs extends AuthFormInputs {
  emailOrUsername: string;
}

const Login = () => {
  const { login, signInWithGoogle } = useAuth();

  const defaultValues: DefaultValues<LogInFormInputs> = {
    emailOrUsername: "",
    password: "",
  };

  const authFields: LogInFieldData[] = [
    {
      name: "emailOrUsername",
      label: "email or username",
      rules: {
        required: {
          value: true,
          message: "Email or Username required",
        },
        pattern: {
          value: /^\S+@\S+\.\S+|[A-Za-z0-9_-]+$/i,
          message: "Entered value does not match email or username format",
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
      },
    },
  ];

  return (
    <GoogleOAuthProvider
      clientId={process.env.NEXT_PUBLIC_GOOGLE_AUTH_CLIENT_ID || ""}
    >
      <AuthForm
        title="Log In to One Day One Plant"
        submitLabel="Log In"
        authFields={authFields}
        defaultValues={defaultValues}
        onSubmit={login}
        footerLink={{
          route: "/auth/signup",
          text: "No account yet ? Sign up here",
        }}
        googleAuthProps={{
          onSuccess: (credentialResponse) => {
            return (
              credentialResponse.credential &&
              signInWithGoogle(credentialResponse.credential, false)
            );
          },
          onError: () => {
            console.log("Login Failed");
          },
          text: "signin_with",
          useOneTap: true,
        }}
      />
    </GoogleOAuthProvider>
  );
};

export default Login;
