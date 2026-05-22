import useTask from "../hooks/useTask";

const TaskList = () => {
  const { tasks, fetchTasks, loading } = useTask();

  return (
    <div className="p-6">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800">Task Dashboard</h1>
        <p className="text-gray-500 mt-2">
          Create, update and track your tasks
        </p>
      </div>
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
                  <button className="px-3 py-1 text-sm bg-blue-500 text-white rounded-md hover:bg-blue-600 transition">
                    Edit
                  </button>

                  <button className="px-3 py-1 text-sm bg-red-500 text-white rounded-md hover:bg-red-600 transition">
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};
export default TaskList;
