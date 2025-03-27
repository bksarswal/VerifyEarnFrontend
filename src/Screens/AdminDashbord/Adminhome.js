import React, { useState } from "react";

const AdminHome = () => {
  const [name, setName] = useState("");
  const [earning, setEarning] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    if (!name || !earning) {
      setMessage("All fields are required!");
      setLoading(false);
      return;
    }

    try {
      // Replace with your actual API call:
      // const response = await fetch('/api/admin/links', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //     'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
      //   },
      //   body: JSON.stringify({
      //     link: name,
      //     earning: parseFloat(earning)
      //   })
      // });

      // if (!response.ok) throw new Error('Failed to add link');
      
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setMessage("Link added successfully!");
      setName("");
      setEarning("");
    } catch (error) {
      console.error("Error adding link:", error);
      setMessage(error.message || "Error adding link. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-lg bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-center text-gray-700 mb-4">Add Links</h2>
        
        {message && (
          <div className={`p-3 mb-4 rounded-lg text-center ${
            message.includes("Error") 
              ? "bg-red-100 text-red-700" 
              : "bg-green-100 text-green-700"
          }`}>
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-600 text-sm font-medium mb-1">Link URL</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="https://example.com"
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-gray-600 text-sm font-medium mb-1">Earning Amount</label>
            <div className="relative">
              <span className="absolute left-3 top-2">$</span>
              <input
                type="number"
                value={earning}
                onChange={(e) => setEarning(e.target.value)}
                placeholder="0.00"
                min="0"
                step="0.01"
                className="w-full pl-8 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 px-4 rounded-lg text-white font-medium transition-colors ${
              loading 
                ? "bg-gray-400 cursor-not-allowed" 
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </span>
            ) : (
              "Add Link"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminHome;