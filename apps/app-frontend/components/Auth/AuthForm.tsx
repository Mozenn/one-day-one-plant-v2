import { AuthFieldData } from "@/types/authFieldData";
import { AuthFormInputs } from "@/types/authFormInputs";
import { useState } from "react";
import { DefaultValues, SubmitHandler, useForm } from "react-hook-form";
import AuthPasswordField from "./AuthPasswordField";
import AuthField from "./AuthField";
import Link from "next/link";

export interface FooterLinkData {
  text: any;
  route: string;
}

const AuthForm = <T extends AuthFieldData, S extends AuthFormInputs>({
  title,
  submitLabel,
  authFields,
  defaultValues,
  onSubmit,
  footerLink,
}: {
  title: string;
  submitLabel: string;
  authFields: T[];
  defaultValues?: DefaultValues<S>;
  onSubmit: (data: any) => Promise<Response | undefined>;
  footerLink: FooterLinkData;
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

    // TODO remove
    res?.headers.forEach((value, key) => console.log("header", key, value));

    if (res && res.status != 201) {
      // TODO remove
      const jsonRes = JSON.parse(await res.text());
      console.log(jsonRes);
      setFormError(jsonRes?.message);
    } else {
      setFormError(null);
    }
  };

  return (
    <main
      className="flex flex-col items-center flex-1 m-0 min-h-[80vh] py-28 px-0 bg-gradient-linear"
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
            className={`globalButton !mt-8 ${
              _formDisabled() ? "globalButtonDisabled" : ""
            }`}
            disabled={_formDisabled()}
          />
          {formError && (
            <span role="alert" className="text-danger mt-1 ">
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
