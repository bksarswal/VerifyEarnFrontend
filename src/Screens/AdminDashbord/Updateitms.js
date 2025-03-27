import React, { useState, useEffect } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

const UpdateItems = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const isAdmin = localStorage.getItem("isAdmin") === "true";

  // Fetch tasks from your backend
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setLoading(true);
        // Replace with your actual API call:
        // const response = await fetch('/api/tasks');
        // const data = await response.json();
        
        // Mock data
        await new Promise(resolve => setTimeout(resolve, 800));
        const mockTasks = [
          { id: '1', LinksValue: 'https://example.com/task1', Earinhg: '$1.50' },
          { id: '2', LinksValue: 'https://example.com/task2', Earinhg: '$2.00' },
          { id: '3', LinksValue: 'https://example.com/task3', Earinhg: '$0.75' }
        ];
        setTasks(mockTasks);
      } catch (error) {
        console.error("Error fetching tasks:", error);
        setError("Failed to load tasks. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  const handleUpdate = async (id, updatedLink, updatedEarning) => {
    try {
      // Replace with your actual API call:
      // const response = await fetch(`/api/tasks/${id}`, {
      //   method: 'PUT',
      //   headers: {
      //     'Content-Type': 'application/json',
      //     'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
      //   },
      //   body: JSON.stringify({
      //     link: updatedLink,
      //     earning: updatedEarning
      //   })
      // });
      
      // if (!response.ok) throw new Error('Failed to update task');
      
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setTasks(prevTasks =>
        prevTasks.map(task =>
          task.id === id
            ? { ...task, LinksValue: updatedLink, Earinhg: updatedEarning }
            : task
        )
      );
      
      alert("Task updated successfully!");
    } catch (error) {
      console.error("Error updating task:", error);
      alert(error.message || "Failed to update task.");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this task?")) return;
    
    try {
      // Replace with your actual API call:
      // const response = await fetch(`/api/tasks/${id}`, {
      //   method: 'DELETE',
      //   headers: {
      //     'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
      //   }
      // });
      
      // if (!response.ok) throw new Error('Failed to delete task');
      
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
      alert("Task deleted successfully!");
    } catch (error) {
      console.error("Error deleting task:", error);
      alert(error.message || "Failed to delete task.");
    }
  };

  return (
    <div className="min-h-screen mt-24 bg-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow-lg rounded-xl overflow-hidden">
          <div className="p-6">
            <h2 className="text-2xl font-semibold text-center mb-6">Manage Tasks</h2>
            
            {loading ? (
              <div className="text-center py-8">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
                <p className="mt-2 text-gray-600">Loading tasks...</p>
              </div>
            ) : error ? (
              <div className="text-center py-8">
                <p className="text-red-500">{error}</p>
                <button 
                  onClick={() => window.location.reload()}
                  className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Retry
                </button>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Task
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Earning
                      </th>
                      {isAdmin && (
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      )}
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {tasks.map((task) => (
                      <tr key={task.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <input
                            type="text"
                            value={task.LinksValue}
                            onChange={(e) => handleUpdate(task.id, e.target.value, task.Earinhg)}
                            className={`border rounded px-3 py-1 w-full ${
                              isAdmin ? "border-gray-300 focus:ring-2 focus:ring-blue-500" : "border-transparent bg-gray-100"
                            }`}
                            disabled={!isAdmin}
                          />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <input
                            type="text"
                            value={task.Earinhg}
                            onChange={(e) => handleUpdate(task.id, task.LinksValue, e.target.value)}
                            className={`border rounded px-3 py-1 w-full ${
                              isAdmin ? "border-gray-300 focus:ring-2 focus:ring-blue-500" : "border-transparent bg-gray-100"
                            }`}
                            disabled={!isAdmin}
                          />
                        </td>
                        {isAdmin && (
                          <td className="px-6 py-4 whitespace-nowrap flex space-x-2">
                            <button
                              onClick={() => handleUpdate(task.id, task.LinksValue, task.Earinhg)}
                              className="text-blue-600 hover:text-blue-900 p-1 rounded hover:bg-blue-50"
                              title="Save changes"
                            >
                              <FaEdit className="h-5 w-5" />
                            </button>
                            <button
                              onClick={() => handleDelete(task.id)}
                              className="text-red-600 hover:text-red-900 p-1 rounded hover:bg-red-50"
                              title="Delete task"
                            >
                              <FaTrash className="h-5 w-5" />
                            </button>
                          </td>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateItems;