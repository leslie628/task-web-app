import { use, useEffect, useState } from "react";
import  AuthService from "../services/AuthService";

const useLogin = () => {
  const [userData, setUserData] = useState({username:'', message:''});
  const [loading, setLoading] = useState(false);
  
  const Login = async (credentials) => {
    setLoading(true);
    try {
      const res = await AuthService.Login(credentials);
      setUserData(res);
      return res;
    } catch (error) {
      console.error("Error Logging in:", error);
    } finally {
      setLoading(false);
    }
  };
  return { userData, Login, loading };
};
export default useLogin;
