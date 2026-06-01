import { use, useEffect, useState, useContext, createContext } from "react";
import AuthService from "../services/AuthService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userData, setUserData] = useState({ username: "", message: "" });
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
  const Logout = async () => {
    setLoading(true);
    try {
      await AuthService.Logout();
      setUserData({ username: "", message: "" });
    } catch (error) {
      console.error("Error Logging out:", error);
    } finally {
      setLoading(false);
    }
  };
  const fetchCurrentUser = async () => {
    setLoading(true);
    try {
      const res = await AuthService.getCurrentUser();
      setUserData(res);
    } catch (error) {
      console.error("Error fetching current user:", error);
    } finally {
      setLoading(false);
      return;
    }
  };
  useEffect(() => {
    fetchCurrentUser();
  }, []);

  return (
    <AuthContext.Provider value={{ userData, Login, Logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
export const useAuth = () => useContext(AuthContext);
