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
      },
      Logout: async () => {
        try {
          const response = await API.post("/api/auth/logout", {});
          return response.data;
        } catch (error) {
          console.error("Error logging out:", error);
          throw error;
        }
      },
      getCurrentUser: async () => {
        try {
          const response = await API.get("/api/auth/user");
          return response.data;
        } catch (error) {
          console.error("Error fetching current user:", error);
          throw error;
        }
      },
    };

    export default AuthService;