import axios from "axios";

const useAuth = () => {
  const login = async () => {
    console.log("login");
  };

  const register = async () => {
    console.log("register");
  };

  const logout = async (redirectUri?: string | undefined) => {
    console.log("logout");
  };

  const isAuthenticated = () => {
    return false;
  };

  const getAuthClient = async () => {
    const axiosCustom = axios.create();

    return axiosCustom;
  };

  return {
    login,
    register,
    logout,
    isAuthenticated,
    getAuthClient,
    authId: 1,
  };
};

export default useAuth;
