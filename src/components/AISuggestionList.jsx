import { useState } from "react";

const AISuggestionList = ({ suggestions, selectedTasks, setSelectedTasks }) => {
  const handleSelect = (task, checked) => {
    if (checked) {
      setSelectedTasks((prev) => [...prev, task]);
    } else {
      setSelectedTasks((prev) => prev.filter((t) => t.name !== task.name));
    }
  };
  return (
    <div className="max-h-96 overflow-y-auto pr-2 space-y-3">
      {suggestions.map((task) => (
        <label
          key={task.id}
          className="flex cursor-pointer items-start gap-3 rounded-lg border p-3 hover:bg-gray-50"
        >
          <input
            type="checkbox"
            onChange={(e) => handleSelect(task, e.target.checked)}
            className="mt-1 h-4 w-4"
          />

          <div>
            <p className="font-medium">{task.name}</p>
            <p className="text-sm text-gray-500">{task.description}</p>
            <p className="text-xs text-gray-400">
              {task.estimated_time_hours} hours
            </p>
          </div>
        </label>
      ))}
    </div>
  );
};
export default AISuggestionList;
