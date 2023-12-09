"use client";

import AuthGuard from "@/components/Auth/AuthGuard";
import useAuth from "@/hooks/useAuth";
import useFetch from "@/hooks/useFetch";
import { User } from "@/types/user";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

type VerificationStatus = "verified" | "unverified" | "unknown";

const Verify = () => {
  const searchParams = useSearchParams();
  const { authFetch, authId } = useAuth();
  const { data, mutate } = useFetch<User>({
    url: `/user/${authId}`,
  });
  const [verificationStatus, setVerificationStatus] =
    useState<VerificationStatus>("unknown");

  useEffect(() => {
    const callVerify = async () => {
      const res = await authFetch("/auth/verify", {
        method: "POST",
        body: JSON.stringify({ token: searchParams.get("token") }),
      });

      setVerificationStatus(res.status === 200 ? "verified" : "unverified");
    };

    if (data && !data.verified) {
      callVerify();
      mutate();
    } else {
      setVerificationStatus("verified");
    }
  }, [authFetch, data, searchParams, mutate]);

  const isVerified = () =>
    verificationStatus === "unknown" ||
    verificationStatus === "verified" ||
    data?.verified;

  return (
    <AuthGuard>
      <main
        className="flex flex-col items-center justify-center flex-1 m-0 min-h-[80vh] py-20 px-0"
        role="main"
      >
        <img
          src={`/images/icons/${isVerified() ? "check" : "x"}-circle.svg`}
          alt={isVerified() ? "Icon of a validate check" : "Icon of an error x"}
          className={`h-24 mb-4 ${
            isVerified() ? "filter-primary" : "filter-danger"
          }`}
        />
        <h1
          className={`${
            isVerified() ? "text-primary-dark" : "text-danger"
          } text-4xl p-4 rounded-full font-bold`}
          role="heading"
        >
          {isVerified()
            ? "Account Verified!"
            : "Error during account verification"}
        </h1>
      </main>
    </AuthGuard>
  );
};

export default Verify;
