import React, { useEffect, useState } from 'react';

const AccountDetailsForm = () => {
  const [userEmail, setUserEmail] = useState('');
  const [registrationDate, setRegistrationDate] = useState('');
  const [tasksCompleted, setTasksCompleted] = useState(0);
  const [lifetimeEarnings, setLifetimeEarnings] = useState(0);
  const [totalWithdraw, setTotalWithdraw] = useState(0);

  useEffect(() => {
    // Simulate fetching user data from your backend
    const fetchUserData = async () => {
      try {
        // Replace with your actual API call:
        // const response = await fetch('/api/user/profile');
        // const data = await response.json();
        
        // Mock data
        setUserEmail('user@example.com');
        setRegistrationDate('2023-01-15');
        setTasksCompleted(42);
        setLifetimeEarnings(1250.75);
        setTotalWithdraw(750.50);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const handleInputChange = (e, setter) => {
    const value = e.target.value;
    setter(value === '' ? '' : Number(value));
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Account Details</h2>
      <form className="space-y-4">
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">Email</label>
          <input
            className="w-full p-2 border rounded-lg bg-gray-100 cursor-not-allowed"
            type="email"
            value={userEmail}
            disabled
          />
        </div>
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">Date of Registration</label>
          <input
            className="w-full p-2 border rounded-lg bg-gray-100 cursor-not-allowed"
            type="date"
            value={registrationDate}
            disabled
          />
        </div>
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">Tasks completed</label>
          <input
            className="w-full p-2 border rounded-lg"
            type="number"
            value={tasksCompleted}
            onChange={(e) => handleInputChange(e, setTasksCompleted)}
            min="0"
          />
        </div>
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">Lifetime earnings</label>
          <input
            className="w-full p-2 border rounded-lg"
            type="number"
            value={lifetimeEarnings}
            onChange={(e) => handleInputChange(e, setLifetimeEarnings)}
            min="0"
            step="0.01"
          />
        </div>
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">Total Withdraw</label>
          <input
            className="w-full p-2 border rounded-lg"
            type="number"
            value={totalWithdraw}
            onChange={(e) => handleInputChange(e, setTotalWithdraw)}
            min="0"
            step="0.01"
          />
        </div>
        <button
          type="button"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition mt-4"
          onClick={() => alert('Changes saved!')}
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default AccountDetailsForm;