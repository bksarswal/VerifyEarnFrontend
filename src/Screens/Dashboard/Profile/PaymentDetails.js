import React, { useState, useEffect } from "react";

const PaymentDetails = () => {
  const [walletBalance] = useState("$1.00");
  const [paymentMethod] = useState("UPI");
  const [upiId, setUpiId] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Fetch user's payment details from your backend
    const fetchPaymentDetails = async () => {
      try {
        setIsLoading(true);
        // Replace with your actual API call:
        // const response = await fetch('/api/user/payment-details');
        // const data = await response.json();
        
        // Mock data
        await new Promise(resolve => setTimeout(resolve, 500));
        setUpiId("user@upi"); // Mock UPI ID
      } catch (error) {
        console.error("Error fetching payment details:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPaymentDetails();
  }, []);

  const validateUpiId = (id) => {
    const upiRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z]+$/;
    if (!id) return "UPI ID is required";
    if (id.length < 5) return "UPI ID should be at least 5 characters";
    if (!upiRegex.test(id)) return "Invalid UPI ID format (example: name@upi)";
    return "";
  };

  const handleSave = async () => {
    const validationError = validateUpiId(upiId);
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      setIsLoading(true);
      // Replace with your actual API call:
      // const response = await fetch('/api/user/update-payment', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({ upiId })
      // });
      
      // if (!response.ok) throw new Error('Failed to save UPI ID');
      
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setIsEditing(false);
      setError("");
      alert("UPI ID updated successfully!");
    } catch (error) {
      console.error("Error saving UPI ID:", error);
      setError(error.message || "Failed to save UPI ID");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Payment Details</h2>
      <form className="space-y-4">
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">Wallet Balance</label>
          <input 
            className="w-full p-2 border rounded-lg bg-gray-100 cursor-not-allowed" 
            type="text" 
            readOnly 
            value={walletBalance} 
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">Payment Method</label>
          <input 
            className="w-full p-2 border rounded-lg bg-gray-100 cursor-not-allowed" 
            type="text" 
            readOnly 
            value={paymentMethod} 
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">UPI ID</label>
          <input
            className={`w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${isEditing ? "" : "bg-gray-100 cursor-not-allowed"}`}
            type="text"
            value={upiId}
            onChange={(e) => {
              setUpiId(e.target.value);
              setError("");
            }}
            readOnly={!isEditing}
            placeholder="Enter your UPI ID (e.g., name@upi)"
          />
          {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>

        {isEditing ? (
          <div className="flex gap-2">
            <button
              className="flex-1 bg-gray-500 text-white p-2 rounded-lg hover:bg-gray-600 transition"
              type="button"
              onClick={() => {
                setIsEditing(false);
                setError("");
              }}
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              className="flex-1 bg-green-600 text-white p-2 rounded-lg hover:bg-green-700 transition disabled:opacity-50"
              type="button"
              onClick={handleSave}
              disabled={isLoading}
            >
              {isLoading ? "Saving..." : "Save"}
            </button>
          </div>
        ) : (
          <button
            className="w-full bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition"
            type="button"
            onClick={() => setIsEditing(true)}
          >
            Edit UPI ID
          </button>
        )}
      </form>
    </div>
  );
};

export default PaymentDetails;