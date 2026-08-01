import AISuggestionList from "../AISuggestionList";
import useTask from "../../../../hooks/useTask";
import useTaskSuggestions from "../../../../hooks/useTaskSuggestions";
import { Sparkles } from "lucide-react";
import { useState } from "react";
const AISuggestionModal = ({ ShowAIAddModal, onSaveBulkTasks }) => {
  const [aITaskSuggest, setAITaskSuggest] = useState({
    description: "",
  });
  const [selectedTasks, setSelectedTasks] = useState([]);
  const {
    suggestTask,
    aITasksSuggested,
    clearAISuggestedTasks,
    loading: suggestionsLoading,
  } = useTaskSuggestions();
  const handleGenerateSuggestions = (taskDescription) => {
    suggestTask(taskDescription);
  };
  const handleCancelAITask = () => {
    ShowAIAddModal(false);
    clearAISuggestedTasks();
    setSelectedTasks([]);
    setAITaskSuggest({ description: "" });
  };
  const handleSaveAITask = () => {
    // Implement task creation logic here
    const payload = selectedTasks.map((task) => ({
      title: task.name,
      description: task.description,
      isCompleted: false,
    }));
    onSaveBulkTasks(payload);
    ShowAIAddModal(false);
    clearAISuggestedTasks();
    setSelectedTasks([]);
    setAITaskSuggest({ description: "" });
  };

  const handleAddAITaskOnChange = (e) => {
    setAITaskSuggest({ ...aITaskSuggest, [e.target.name]: e.target.value });
  };
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-white w-[90%] max-w-md rounded-2xl shadow-2xl p-6 relative">
        {/* Header */}
        <h2 className="text-xl font-semibold text-gray-800 mb-5">
          AI Task planner
        </h2>

        {/* Description Input */}
        <div className="flex flex-col items-center justify-center py-4">
          <textarea
            className="w-full border border-gray-300 rounded-lg p-3 mb-4 
                   focus:outline-none focus:ring-2 focus:ring-green-400 resize-none"
            placeholder="Task description"
            name="description"
            value={aITaskSuggest.description}
            onChange={handleAddAITaskOnChange}
            rows={1}
          />
          <button
            onClick={() => handleGenerateSuggestions(aITaskSuggest.description)}
            className="flex px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 transition"
          >
            <Sparkles size={16} /> Generate Suggestions
          </button>
        </div>

        <AISuggestionList
          suggestions={aITasksSuggested}
          selectedTasks={selectedTasks}
          setSelectedTasks={setSelectedTasks}
          loading={suggestionsLoading}
        />
        {suggestionsLoading && (
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-white/60 backdrop-blur-sm">
            <div className="w-10 h-10 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-3 text-gray-600">Loading...</p>
          </div>
        )}
        {/* Buttons */}
        <div className="flex justify-end gap-3 mt-4">
          <button
            onClick={() => handleCancelAITask()}
            className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 transition"
          >
            Cancel
          </button>
          <button
            onClick={handleSaveAITask}
            className="px-4 py-2 rounded-lg bg-green-500 text-white 
                     hover:bg-green-600 transition shadow-md"
          >
            Save Task
          </button>
        </div>
      </div>
    </div>
  );
};
export default AISuggestionModal;