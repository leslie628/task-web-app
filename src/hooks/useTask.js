import { useEffect, useState } from "react";
import TaskService from "../services/TaskService";

const useTask = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const data = await TaskService.getTasks();
      setTasks(data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    } finally {
      setLoading(false);
    }
  };
  const deleteTask = async (id) => {
    try {
      await TaskService.deleteTask(id);
      fetchTasks();
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };
  const updateTask = async (taskData) => {
    try {
      await TaskService.updateTask(taskData);
      fetchTasks();
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };
  const createTask = async (taskData) => {
    try {
      setLoading(true);
      await TaskService.createTask(taskData);
      fetchTasks();
    } catch (error) {
      console.error("Error creating task:", error);
    } finally {
      setLoading(false);
    }
  };
  return { tasks, fetchTasks, loading, deleteTask, updateTask, createTask };
};
export default useTask;
