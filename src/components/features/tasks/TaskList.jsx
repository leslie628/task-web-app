import { React, useState, useEffect } from "react";
import useTask from "../../../hooks/useTask";
import Header from "../../Header/header";
import { Sparkles } from "lucide-react";
import useTaskSuggestions from "../../../hooks/useTaskSuggestions";
import AISuggestionModal from "../tasks/modals/AISuggestionModal";
const TaskList = () => {
  const {
    tasks,
    fetchTasks,
    loading,
    deleteTask,
    deleteBulkTask,
    updateTask,
    createTask,
    createBulkTask,
  } = useTask();

  const [editingTask, setEditingTask] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editTitle, setEditTitle] = useState("");
  const [editTask, setEditTask] = useState({ title: "", description: "" });
  const [showAddModal, setShowAddModal] = useState(false);
  const [showAIAddModal, setShowAIAddModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState(null);
  const [selectedTasks, setSelectedTasks] = useState([]);
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    isCompleted: false,
  });

  const handleEditClick = (task) => {
    setEditTask({
      ...editTask,
      id: task.id,
      title: task.title,
      description: task.description,
    });
    setShowEditModal(true);
  };
  const handleUpdate = async () => {
    await updateTask(editTask);
    setShowEditModal(false);
  };
  const handleEditOnChange = (e) => {
    setEditTask({ ...editTask, [e.target.name]: e.target.value });
  };
  const handleAddOnChange = (e) => {
    setNewTask({ ...newTask, [e.target.name]: e.target.value });
  };

  const handleAddTask = () => {
    // Implement task creation logic here
    createTask(newTask);
    setShowAddModal(false);
    setNewTask({ title: "", description: "", isCompleted: false });
  };
  const handleOnSaveBulkTasks = (tasksData) => {
    createBulkTask(tasksData);
  };
  const confirmDelete = async () => {
    await deleteTask(selectedTaskId);
    setShowDeleteModal(false);
    setSelectedTaskId(null);
  };
  const handleDeleteClick = (id) => {
    setSelectedTaskId(id);
    setShowDeleteModal(true);
  };
  const handleSelection = (taskId) => {
    setSelectedTasks((prevSelected) => {
      if (prevSelected.includes(taskId)) {
        return prevSelected.filter((id) => id !== taskId);
      } else {
        return [...prevSelected, taskId];
      }
    });
  };
  const handleDeleteSelected = async () => {
    await deleteBulkTask(selectedTasks);
    setSelectedTasks([]);
  };
  useEffect(() => {
    console.log("Selected Tasks:", selectedTasks);
  }, [selectedTasks]);

  return (
    <div className="p-6">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800">Task Dashboard</h1>
        <p className="text-gray-500 mt-2">
          Create, update and track your tasks
        </p>
      </div>
      <button
        onClick={() => setShowAddModal(true)}
        className="bg-green-500 text-white px-4 py-2 rounded"
      >
        + Add Task
      </button>
      <button
        onClick={() => setShowAIAddModal(true)}
        className="bg-green-500 text-white px-4 py-2 m-2 rounded flex-row"
      >
        <div className="flex flex-row">
          <Sparkles size={18} />
          AI Task Planner
        </div>
      </button>
      <button
        onClick={() => handleDeleteSelected()}
        className={`px-4 py-2 m-2 rounded text-white flex-row ${
          selectedTasks.length === 0
            ? "bg-gray-400 cursor-not-allowed opacity-60"
            : "bg-green-500 hover:bg-green-600"
        }`}
        disabled={selectedTasks.length === 0}
      >
        <div className="flex flex-row">Delete All</div>
      </button>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2"></th>
            <th className="border p-2">Title</th>
            <th className="border p-2">Description</th>
            <th className="border p-2">Completed</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>

        <tbody>
          {loading ? (
            <tr>
              <td colSpan="4" className="border p-2 text-center">
                Loading tasks...
              </td>
            </tr>
          ) : (
            tasks.map((task) => (
              <tr key={task.id} className="text-center">
                <td className="border p-2">
                  <input
                    type="checkbox"
                    onChange={() => handleSelection(task.id)}
                  />
                </td>
                <td className="border p-2">{task.title}</td>
                <td className="border p-2">{task.description}</td>
                <td className="border p-2">
                  <input type="checkbox" checked={task.isCompleted} readOnly />
                </td>
                <td className="border p-2 space-x-2">
                  <button
                    className="px-3 py-1 text-sm bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
                    onClick={() => handleEditClick(task)}
                  >
                    Edit
                  </button>

                  <button
                    className="px-3 py-1 text-sm bg-red-500 text-white rounded-md hover:bg-red-600 transition"
                    onClick={() => handleDeleteClick(task.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      {loading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/60 backdrop-blur-sm z-50">
          <div className="w-10 h-10 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-3 text-gray-600">Loading...</p>
        </div>
      )}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-white w-[90%] max-w-md rounded-2xl shadow-2xl p-6">
            {/* Header */}
            <h2 className="text-xl font-semibold text-gray-800 mb-5">
              ➕ Add New Task
            </h2>

            {/* Title Input */}
            <input
              className="w-full border border-gray-300 rounded-lg p-3 mb-3 
                   focus:outline-none focus:ring-2 focus:ring-green-400"
              placeholder="Task title"
              name="title"
              value={newTask.title}
              onChange={handleAddOnChange}
            />

            {/* Description Input */}
            <textarea
              className="w-full border border-gray-300 rounded-lg p-3 mb-4 
                   focus:outline-none focus:ring-2 focus:ring-green-400 resize-none"
              placeholder="Task description"
              name="description"
              value={newTask.description}
              onChange={handleAddOnChange}
              rows={3}
            />

            {/* Buttons */}
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 transition"
              >
                Cancel
              </button>

              <button
                onClick={handleAddTask}
                className="px-4 py-2 rounded-lg bg-green-500 text-white 
                     hover:bg-green-600 transition shadow-md"
              >
                Save Task
              </button>
            </div>
          </div>
        </div>
      )}
      {showAIAddModal && (
        <AISuggestionModal
          ShowAIAddModal={setShowAIAddModal}
          onSaveBulkTasks={handleOnSaveBulkTasks}
        />
      )}
      {showEditModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-white w-[90%] max-w-md rounded-2xl shadow-2xl p-6">
            {/* Header */}
            <h2 className="text-xl font-semibold text-gray-800 mb-5">
              ➕ Edit Task
            </h2>

            {/* Title Input */}
            <input
              className="w-full border border-gray-300 rounded-lg p-3 mb-3 
                   focus:outline-none focus:ring-2 focus:ring-green-400"
              placeholder="Task title"
              name="title"
              value={editTask.title}
              onChange={handleEditOnChange}
            />

            {/* Description Input */}
            <textarea
              className="w-full border border-gray-300 rounded-lg p-3 mb-4 
                   focus:outline-none focus:ring-2 focus:ring-green-400 resize-none"
              placeholder="Task description"
              name="description"
              value={editTask.description}
              onChange={handleEditOnChange}
              rows={3}
            />

            {/* Buttons */}
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowEditModal(false)}
                className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 transition"
              >
                Cancel
              </button>

              <button
                onClick={handleUpdate}
                className="px-4 py-2 rounded-lg bg-green-500 text-white 
                     hover:bg-green-600 transition shadow-md"
              >
                Save Task
              </button>
            </div>
          </div>
        </div>
      )}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-white w-[90%] max-w-sm rounded-2xl shadow-2xl p-6">
            {/* Title */}
            <h2 className="text-lg font-semibold text-gray-800 mb-2">
              ⚠️ Delete Task
            </h2>

            {/* Message */}
            <p className="text-gray-600 mb-5">
              Are you sure you want to delete this task?
            </p>

            {/* Buttons */}
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 transition"
              >
                Cancel
              </button>

              <button
                onClick={confirmDelete}
                className="px-4 py-2 rounded-lg bg-red-500 text-white 
                     hover:bg-red-600 transition shadow-md"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default TaskList;
