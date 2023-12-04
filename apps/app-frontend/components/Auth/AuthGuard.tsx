import useAuth from "@/hooks/useAuth";
import { useRouter } from "next/navigation";

const AuthGuard = ({ children }: { children: JSX.Element }) => {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  if (!isAuthenticated()) {
    router.push("/");
  }

  return children;
};

export default AuthGuard;
