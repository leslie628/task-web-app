import API from "../api/api";

const TaskService = {
  getTasks: async () => {
    try {
      const response = await API.get("/api/task");
      return response.data;
    } catch (error) {
      console.error("Error fetching tasks:", error);
      throw error;
    }
  },

  createTask: async (task) => {
    try {
      const response = await API.post("/api/tasks", task);
      return response.data;
    } catch (error) {
      console.error("Error creating task:", error);
      throw error;
    }
  }
};

export default TaskService;