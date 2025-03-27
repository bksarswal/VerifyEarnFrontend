import React, { useState, useEffect } from "react";
import { CheckCircle, Clock } from "lucide-react";

export default function TaskHistory() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    // Simulate API call with mock data
    const fetchTasks = async () => {
      try {
        // Replace with your actual API call:
        // const response = await fetch('/api/tasks');
        // const data = await response.json();
        
        // Mock data
        await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network delay
        const mockTasks = [
          { id: '1', name: 'Complete Survey', verified: false, code: '' },
          { id: '2', name: 'Watch Video', verified: false, code: '' },
          { id: '3', name: 'Install App', verified: false, code: '' },
          { id: '4', name: 'Sign Up Offer', verified: false, code: '' },
          { id: '5', name: 'Refer Friend', verified: false, code: '' }
        ];
        
        setTasks(mockTasks);
        setLoading(false);
      } catch (err) {
        setError("Failed to load tasks. Please try again.");
        setLoading(false);
        console.error("Error fetching tasks:", err);
      }
    };

    fetchTasks();
  }, []);

  const handleCodeChange = (id, value) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === id ? { ...task, code: value } : task
      )
    );
  };

  const handleVerify = (id) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === id ? { ...task, verified: task.code === "1234" } : task
      )
    );
  };

  return (
    <div className="min-h-screen mt-24 bg-gray-100 py-8">
      <div className="max-w-7xl mx-auto bg-white shadow-lg rounded-xl p-6">
        <h2 className="text-2xl font-semibold text-center mb-4">Task Verification</h2>
        {loading ? (
          <p className="text-center text-gray-500">Loading tasks...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-200 shadow-md">
                  <th className="border border-gray-300 px-4 py-2 text-left">Sr. No</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Task</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Enter Code</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Status</th>
                </tr>
              </thead>
              <tbody>
                {tasks.map((task, index) => (
                  <tr key={task.id} className="hover:bg-gray-100">
                    <td className="border border-gray-300 px-4 py-2">{index + 1}</td>
                    <td className="border border-gray-300 text-blue-500 px-4 py-2">{task.name}</td>
                    <td className="border border-gray-300 px-4 py-2">
                      <input
                        type="text"
                        value={task.code}
                        onChange={(e) => handleCodeChange(task.id, e.target.value)}
                        className={`w-full border rounded-md px-2 py-1 focus:outline-none ${
                          task.verified ? "border-green-500 bg-green-50" : "border-gray-300"
                        }`}
                        placeholder="Enter code"
                        disabled={task.verified}
                      />
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      <div className="flex items-center space-x-2">
                        {task.verified ? (
                          <>
                            <CheckCircle className="h-5 w-5 text-green-500" />
                            <span className="text-green-600 font-bold">Verified</span>
                          </>
                        ) : (
                          <>
                            <Clock className="h-5 w-5 text-yellow-500" />
                            <button
                              onClick={() => handleVerify(task.id)}
                              className="bg-blue-500 text-white px-4 py-1 rounded-md hover:bg-blue-600 transition text-sm"
                            >
                              Verify
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}