import { usePathname } from "next/navigation";
import useLocalStorage from "./useLocalStorage";
import { User } from "@/types/user";

export type AuthFetchParams = {
  [key: string]: any;
};

export type AuthFetchProps = {
  method?: string;
  headers?: HeadersInit;
  params?: AuthFetchParams;
  body?: BodyInit | null;
};

const useAuth = () => {
  const pathname = usePathname();
  const [authId, setAuthId] = useLocalStorage<number>("authId", null);
  const [scheduledToast, setScheduledToast] = useLocalStorage<string>(
    "scheduledToast",
    null,
  );

  const login = async (data: any) => {
    console.log("login");
    const res = await authFetch(`/auth/login`, {
      method: "POST",
      body: JSON.stringify(data),
    });

    if (res.status === 200) {
      const user = await res.json();
      setAuthId(user.id);
      if (!user.verified) {
        setScheduledToast(
          JSON.stringify({
            type: "warning",
            message:
              "Your account has not been confirmed yet. Please check your email, or ask for the confirmation email to be re-sent in your profile page",
          }),
        );
      }
      redirectTo("/");
    } else {
      return res;
    }
  };

  const register = async (data: any) => {
    console.log("register");
    const res = await authFetch(`/auth/signup`, {
      method: "POST",
      body: JSON.stringify(data),
    });

    if (res.status === 201) {
      const user: User = await res.json();
      setAuthId(user.id);
      redirectTo("/");
      setScheduledToast(
        JSON.stringify({
          type: "success",
          message: `Welcome! An email has been sent to ${user.email} to verify your account`,
        }),
      );
    } else {
      return res;
    }
  };

  const signInWithGoogle = async (
    token: string,
    displayToastOnSuccess: boolean,
  ) => {
    console.log("sign in with google");
    let res;
    try {
      res = await authFetch(`/auth/signin-google`, {
        method: "POST",
        body: JSON.stringify({ token }),
      });
    } catch (e) {
      console.log("HYE", res);
    }

    if (!res) {
      return;
    }

    if (res.status === 201) {
      const user: User = await res.json();
      setAuthId(user.id);
      redirectTo("/");
      displayToastOnSuccess &&
        setScheduledToast(
          JSON.stringify({
            type: "success",
            message: `Welcome! An email has been sent to ${user.email} to verify your account`,
          }),
        );
    } else {
      return res;
    }
  };

  const logout = async (redirectUri?: string | undefined) => {
    console.log("logout");
    const res = await authFetch(`/auth/logout`, {
      method: "POST",
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

  const authFetch = async (
    target: string,
    props: AuthFetchProps = { method: "GET" },
  ) => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}${target}${
        props.params != undefined ? "?" + new URLSearchParams(props.params) : ""
      }`,
      {
        method: props.method || "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          ...props?.headers,
        },
        body: props?.body,
      },
    );

    if (res?.status === 401) {
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
    signInWithGoogle,
    logout,
    isAuthenticated,
    authFetch,
    authId,
  };
};

export default useAuth;
