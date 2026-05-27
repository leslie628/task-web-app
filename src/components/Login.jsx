import { useState } from "react";
import AuthService from "../services/AuthService";
import { useNavigate } from "react-router-dom";
import useLogin from "../hooks/useLogin";
const Login = () => {
  const { Login, loading, userData } = useLogin();
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const handleLogin = async () => {
    try {
      const data = await Login(credentials);
      navigate("/tasks");
      console.log(data);
    } catch (error) {
      // Handle login error
    }
  };
  const handleGuestLogin = async () => {
    try {
      await Login({
        username: "guest",
        password: "guest123",
      });
      navigate("/tasks");
    } catch (error) {
      // Handle guest login error
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-xs p-6 border rounded-lg shadow-md">
        <input
          type="text"
          placeholder="Username"
          value={credentials.username}
          onChange={(e) =>
            setCredentials({ ...credentials, username: e.target.value })
          }
          className="w-full mb-3 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <input
          type="password"
          placeholder="Password"
          value={credentials.password}
          onChange={(e) =>
            setCredentials({ ...credentials, password: e.target.value })
          }
          className="w-full mb-3 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <button
          onClick={handleLogin}
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition mb-3"
        >
          Login
        </button>

        <button
          onClick={() => navigate("/register")}
          className="w-full bg-gray-200 text-gray-800 py-2 rounded-md hover:bg-gray-300 transition"
        >
          Register New User
        </button>

        <button
          className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition mt-3"
          onClick={handleGuestLogin}
        >
          Continue as Guest
        </button>
        <div class="mt-6 flex justify-center">
          <div class="text-xs text-gray-400 bg-gray-50 border border-gray-200 px-3 py-2 rounded-md">
            Note: First login may take a few seconds due to server cold start
            (free hosting).
          </div>
        </div>
      </div>
      {loading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/60 backdrop-blur-sm z-50">
          <div className="w-10 h-10 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-3 text-gray-600">Loading...</p>
        </div>
      )}
    </div>
  );
};
export default Login;
