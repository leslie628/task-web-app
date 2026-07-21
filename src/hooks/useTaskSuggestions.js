import { useState } from "react";
import TaskService from "../services/TaskService";
const useTaskSuggestions = () => {
    const [suggestions, setSuggestions] = useState([]);
      const [aITasksSuggested, setAITasksSuggested] = useState([]);
      const [loading, setLoading] = useState(false);

const suggestTask = async (description) => {
    try {
      setLoading(true);
      const suggestions = await TaskService.suggestTask(description);
      setAITasksSuggested(suggestions?.subtasks);
    } catch (error) {
      console.error("Error suggesting task:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };
  const clearAISuggestedTasks = () => {
    setAITasksSuggested([]);
  };

  return {suggestTask, aITasksSuggested, clearAISuggestedTasks, loading};
};
export default useTaskSuggestions;