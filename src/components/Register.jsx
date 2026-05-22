import AuthService from "../services/AuthService";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
const Register = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const handleRegister = async () => {
    try {
      const data=await AuthService.Register(credentials);
      console.log(data);
      navigate("/login");
    } catch (error) {
      console.error("Error registering user:", error);
    }
  };
  return (
    <div>
      <h1>Register</h1>
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
            onClick={handleRegister}
            className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition"
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
};
export default Register;
