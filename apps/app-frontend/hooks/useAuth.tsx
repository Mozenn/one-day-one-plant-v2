import { useRouter } from "next/navigation";
import useLocalStorage from "./useLocalStorage";

export type AuthFetchParams = {
  [key: string]: any;
};

export type AuthFetchProps = {
  headers?: HeadersInit;
  params?: AuthFetchParams;
};

const useAuth = () => {
  const router = useRouter();
  const [authUser, setAuthUser] = useLocalStorage("authUser", null);

  const login = async () => {
    console.log("login");
  };

  const register = async (data: any) => {
    console.log("register");
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}auth/signup`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (res.status === 201) {
      const user = res.json();
      setAuthUser(user);
      // todo setup auth by saving user in local storage
      router.push("/");
    } else {
      return res;
    }
  };

  const logout = async (redirectUri?: string | undefined) => {
    console.log("logout");
    const res = await authFetch("/auth/logout");
    if (res.status === 200) {
      setAuthUser(null);
      router.push(redirectUri || "/");
    }
  };

  const isAuthenticated = () => {
    return false;
  };

  const authFetch = async (target: string, props?: AuthFetchProps) => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}${target}${
        props && "?" + new URLSearchParams(props.params)
      }`,
      {
        method: "GET",
        credentials: "include",
        headers: props?.headers,
      }
    );

    if (res.status === 401) {
      // TODO handle unauthorized result
    }

    return res;
  };

  return {
    login,
    register,
    logout,
    isAuthenticated,
    authFetch,
    authUser,
  };
};

export default useAuth;
