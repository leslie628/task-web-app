import { useState } from "react";
import useTask from "../hooks/useTask";

const TaskList = () => {
  const { tasks, fetchTasks, loading, deleteTask, updateTask, createTask } =
    useTask();
  const [editingTask, setEditingTask] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState(null);
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    isCompleted: false,
  });

  const handleEditClick = (task) => {
    setEditingTask(task);
    //setEditTitle(task.title);
  };
  const handleUpdate = async () => {
    await updateTask(editingTask.id, { title: editTitle });
    setEditingTask(null);
    fetchTasks(); // refresh list
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
  const confirmDelete = async () => {
    await deleteTask(selectedTaskId);
    setShowDeleteModal(false);
    setSelectedTaskId(null);
    fetchTasks();
  };
  const handleDeleteClick = (id) => {
    setSelectedTaskId(id);
    setShowDeleteModal(true);
  };
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
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
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
