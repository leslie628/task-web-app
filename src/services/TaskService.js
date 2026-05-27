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
      const response = await API.post("/api/task", task);
      return response.data;
    } catch (error) {
      console.error("Error creating task:", error);
      throw error;
    }
  },
  deleteTask: async (id) => {
    try {
      const response = await API.delete(`/api/task/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error deleting task:", error);
      throw error;
    }
  },
    updateTask: async (taskData) => {
    try {
      const response = await API.put("/api/task", { ...taskData });
      return response.data;
    } catch (error) {
      console.error("Error updating task:", error);
      throw error;
    }
  }
};

export default TaskService;