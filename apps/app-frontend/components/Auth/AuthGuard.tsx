"use client";

import useAuth from "@/hooks/useAuth";
import useLoader from "@/hooks/useLoader";
import { useRouter } from "next/navigation";
import Spinner from "../Spinner/Spinner";

const AuthGuard = ({ children }: { children: JSX.Element }) => {
  const { isAuthenticated } = useAuth();
  const { isLoaded } = useLoader();
  const router = useRouter();

  if (!isLoaded) {
    return <Spinner />;
  }

  if (!isAuthenticated() && isLoaded) {
    router.push("/");
  }

  return children;
};

export default AuthGuard;
