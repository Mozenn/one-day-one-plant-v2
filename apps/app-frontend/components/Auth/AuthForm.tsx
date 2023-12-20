import { AuthFieldData } from "@/types/authFieldData";
import { AuthFormInputs } from "@/types/authFormInputs";
import { useState } from "react";
import { DefaultValues, SubmitHandler, useForm } from "react-hook-form";
import AuthPasswordField from "./AuthPasswordField";
import AuthField from "./AuthField";
import Link from "next/link";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";

export interface FooterLinkData {
  text: any;
  route: string;
}

export interface GoogleAuthProps {
  onSuccess: (credentialResponse: CredentialResponse) => any;
  onError: (() => void) | undefined;
  text: "signup_with" | "signin_with" | "continue_with" | "signin" | undefined;
  useOneTap: boolean;
}

const AuthForm = <T extends AuthFieldData, S extends AuthFormInputs>({
  title,
  submitLabel,
  authFields,
  defaultValues,
  onSubmit,
  footerLink,
  googleAuthProps,
}: {
  title: string;
  submitLabel: string;
  authFields: T[];
  defaultValues?: DefaultValues<S>;
  onSubmit: (data: any) => Promise<Response | undefined>;
  footerLink: FooterLinkData;
  googleAuthProps: GoogleAuthProps;
}) => {
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<S>({
    mode: "onSubmit",
    reValidateMode: "onChange",
    defaultValues: defaultValues,
  });
  const [formError, setFormError] = useState<string | null>(null);

  const _formDisabled = () => Object.entries(errors).length > 0;

  const _onSubmit: SubmitHandler<S> = async (data) => {
    const res = await onSubmit(data);

    if (res && res.status != 201) {
      const jsonRes = JSON.parse(await res.text());
      setFormError(jsonRes?.message);
    } else {
      setFormError(null);
    }
  };

  return (
    <main
      className="flex flex-col items-center flex-1 min-h-[75vh] pt-28 pt-25 px-0 bg-gradient-linear"
      role="main"
    >
      <div className="flex items-center flex-col w-2/5 bg-white border-solid border-primary-dark border-4 rounded-3xl p-12 shadow-xl">
        <img
          className="h-[12rem] w-auto absolute top-28"
          src="/images/logo.png"
          alt="Logo"
        />
        <h2 className="text-3xl font-bold mt-16 mb-8">{title}</h2>
        <form
          onSubmit={handleSubmit(_onSubmit)}
          className="flex items-center flex-col w-3/4"
        >
          {authFields.map((fieldData) =>
            fieldData.name === "password" ? (
              <AuthPasswordField
                key={fieldData.name}
                label={fieldData.label || fieldData.name}
                useControllerProps={{
                  name: fieldData.name,
                  control: control,
                  rules: fieldData.rules,
                }}
              />
            ) : (
              <AuthField
                key={fieldData.name}
                label={fieldData.label || fieldData.name}
                useControllerProps={{
                  name: fieldData.name,
                  control: control,
                  rules: fieldData.rules,
                }}
              />
            ),
          )}
          <input
            type="submit"
            value={submitLabel}
            className={`globalButton !mt-8 mb-2 ${
              _formDisabled() ? "globalButtonDisabled" : ""
            }`}
            disabled={_formDisabled()}
          />
          <GoogleLogin
            onSuccess={async (credentialResponse) => {
              const res = await googleAuthProps.onSuccess(credentialResponse);
              if (res && res.status !== 201) {
                setFormError("Sign in failed");
              }
            }}
            onError={() => {
              setFormError("Sign in failed");
            }}
            shape="circle"
            text={googleAuthProps.text}
            theme="outline"
            useOneTap={googleAuthProps.useOneTap}
          />
          {formError && (
            <span role="alert" className="text-danger mt-1 mb-2">
              {formError}
            </span>
          )}
        </form>
        <Link href={footerLink.route} passHref>
          <p className="mt-4 underline hover:text-primary transition-colors duration-200">
            {footerLink.text}
          </p>
        </Link>
      </div>
    </main>
  );
};

export default AuthForm;
