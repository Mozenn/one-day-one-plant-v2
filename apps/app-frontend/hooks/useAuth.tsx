import { usePathname } from "next/navigation";
import useLocalStorage from "./useLocalStorage";

export type AuthFetchParams = {
  [key: string]: any;
};

export type AuthFetchProps = {
  headers?: HeadersInit;
  params?: AuthFetchParams;
};

const useAuth = () => {
  const pathname = usePathname();
  const [authId, setAuthId] = useLocalStorage<number>("authId", null);

  const login = async (data: any) => {
    console.log("login");
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (res.status === 200) {
      const user = await res.json();
      setAuthId(user.id);
      redirectTo("/");
    } else {
      return res;
    }
  };

  const register = async (data: any) => {
    console.log("register");
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/signup`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (res.status === 201) {
      const user = await res.json();
      setAuthId(user.id);
      redirectTo("/");
    } else {
      return res;
    }
  };

  const logout = async (redirectUri?: string | undefined) => {
    console.log("logout");
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/logout`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}),
    });

    if (res.status === 200 || res.status === 401) {
      setAuthId(null);
      redirectTo(redirectUri || "/");
    }
  };

  const isAuthenticated = () => {
    return authId != null;
  };

  const authFetch = async (target: string, props?: AuthFetchProps) => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}${target}${
        props != undefined ? "?" + new URLSearchParams(props.params) : ""
      }`,
      {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          ...props?.headers,
        },
      }
    );

    if (res.status === 401) {
      setAuthId(null);
      redirectTo("/auth/login");
    }

    return res;
  };

  const redirectTo = (path: string) => {
    console.log(`redirect to ${path} from ${pathname}`);
    if (pathname == path) {
      window.location.reload();
    } else {
      window.location.replace(`${process.env.NEXT_PUBLIC_APP_URL}${path}`);
    }
  };

  return {
    login,
    register,
    logout,
    isAuthenticated,
    authFetch,
    authId,
  };
};

export default useAuth;
