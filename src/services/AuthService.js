import API from "../api/api";

const AuthService = {
  Login: async (credentials) => {
    try {
      const response = await API.post("/api/auth/login", credentials);
      return response.data;
    } catch (error) {
      console.error("Error logging in:", error);
      throw error;
    }
  },

  Register: async (credentials) => {
    try {
      const response = await API.post("/api/auth/register", credentials);
      return response.data;
    } catch (error) {
      console.error("Error registering:", error);
      throw error;
    }
  }
};

export default AuthService;