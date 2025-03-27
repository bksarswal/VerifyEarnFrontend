import { useState, useEffect } from "react";
import WithdrawalHistory from "./Withdrawhistry";

export default function WithdrawalPage() {
  const [amount, setAmount] = useState("");
  const [method, setMethod] = useState("UPI"); // Default method
  const [account, setAccount] = useState("user@upi"); // Mock UPI ID
  const [withdrawals, setWithdrawals] = useState([]);
  const [userId, setUserId] = useState(null);

  const totalBalance = 5000;
  const availableBalance = 3000;
  const minWithdrawal = 500;

  useEffect(() => {
    // Simulate fetching user data
    const fetchUserData = async () => {
      try {
        // Replace with your actual API call
        // const response = await fetch('/api/user/payment-details');
        // const data = await response.json();
        
        // Mock data
        setMethod("UPI");
        setAccount("user@upi");
      } catch (error) {
        console.error("Error fetching payment details:", error);
      }
    };

    fetchUserData();
  }, []);

  const handleWithdraw = () => {
    const withdrawalAmount = Number(amount);

    if (!withdrawalAmount || withdrawalAmount < minWithdrawal) {
      alert(`Minimum withdrawal amount is ₹${minWithdrawal}`);
      return;
    }

    if (withdrawalAmount > availableBalance) {
      alert("Insufficient available balance");
      return;
    }

    if (!account.trim()) {
      alert("Please enter a valid UPI ID");
      return;
    }

    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+$/.test(account)) {
      alert("Please enter a valid UPI ID (example: yourname@upi)");
      return;
    }

    const confirmWithdrawal = window.confirm(
      `Please confirm your withdrawal request:\nAmount: ₹${withdrawalAmount}\nMethod: ${method}\nUPI ID: ${account}`
    );

    if (confirmWithdrawal) {
      const newWithdrawal = {
        id: withdrawals.length + 1,
        method,
        amount: withdrawalAmount,
        date: new Date().toLocaleString(),
      };

      setWithdrawals([...withdrawals, newWithdrawal]);
      alert("Withdrawal request submitted successfully!");
    }
  };

  return (
    <div className="mt-16 mb-10 flex flex-col items-center justify-center min-h-screen w-full bg-gray-100">
      <h1 className="mb-4 text-lg font-bold text-red-600">NOTE: Withdrawal limit is ₹500</h1>

      <div className="flex flex-col md:flex-row w-full max-w-2xl bg-white shadow-lg rounded-lg p-6">
        <div className="w-full md:w-1/3 p-4 bg-blue-50 rounded-lg border border-gray-300 shadow-md text-center">
          <p className="text-lg font-semibold text-gray-700">Total Balance:</p>
          <p className="text-2xl font-bold text-blue-700">₹{totalBalance}</p>
          <p className="text-lg font-semibold text-gray-700 mt-2">Available for Withdrawal:</p>
          <p className="text-2xl font-bold text-green-600">₹{availableBalance}</p>
        </div>

        <div className="w-full md:w-2/3 md:pl-6 mt-4 md:mt-0">
          <label className="block text-sm font-medium text-gray-700">Amount</label>
          <input 
            type="number" 
            placeholder="Enter amount (Min ₹500)" 
            value={amount} 
            onChange={(e) => setAmount(e.target.value)} 
            className="mb-4 w-full p-2 border rounded focus:ring-2 focus:ring-blue-500" 
          />

          <label className="block text-sm font-medium text-gray-700">Payment Method</label>
          <select
            value={method}
            onChange={(e) => setMethod(e.target.value)}
            className="mb-4 w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
          >
            <option value="UPI">UPI</option>
            <option value="Bank Transfer">Bank Transfer</option>
            <option value="PayPal">PayPal</option>
          </select>

          <label className="block text-sm font-medium text-gray-700">
            {method === "UPI" ? "UPI ID" : method === "Bank Transfer" ? "Account Number" : "PayPal Email"}
          </label>
          <input 
            type="text" 
            value={account} 
            onChange={(e) => setAccount(e.target.value)}
            placeholder={method === "UPI" ? "yourname@upi" : method === "Bank Transfer" ? "Bank account details" : "PayPal email"}
            className="mb-4 w-full p-2 border rounded focus:ring-2 focus:ring-blue-500" 
          />

          <button 
            onClick={handleWithdraw} 
            className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition"
          >
            Withdraw
          </button>
        </div>
      </div>

      <WithdrawalHistory withdrawals={withdrawals} />
    </div>
  );
}