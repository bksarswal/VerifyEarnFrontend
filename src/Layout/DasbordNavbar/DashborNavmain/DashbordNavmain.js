import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Bell, CircleUserRound } from "lucide-react";
import accountBalanceWalletIcon from "../DashborNavmain/account-balance-wallet-55dp-000000-fill0-wght400-grad0-opsz48-1.png";
import logoImage from "../DashborNavmain/imadsdge-1.png";

function DashboardNavbar() {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isNotificationOpen, setNotificationOpen] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const location = useLocation();

  // Fetch user data from your backend
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Replace with your actual API call:
        // const response = await fetch('/api/user/profile');
        // const data = await response.json();
        
        // Mock data
        await new Promise(resolve => setTimeout(resolve, 300));
        setUserEmail("user@example.com");
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const toggleMenu = () => setMenuOpen(!isMenuOpen);
  const toggleNotification = () => setNotificationOpen(!isNotificationOpen);

  const isActive = (path) => location.pathname === path;

  const getInitials = (email) => {
    if (!email) return "";
    const username = email.split("@")[0];
    return username.slice(0, 2).toUpperCase();
  };

  return (
    <>
      <div className="fixed top-0 left-0 w-full z-50 mx-auto flex items-center justify-between px-4 sm:px-6 py-3 bg-white shadow-sm">
        {/* Logo and Brand Name */}
        <Link to="/dashboard" className="flex items-center">
          <img
            className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 object-cover mr-2 sm:mr-3 md:mr-4"
            alt="Verify Earn Logo"
            src={logoImage}
          />
          <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold text-black">
            Verify Earn
          </h1>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6 lg:space-x-8">
          <div className="flex items-center">
            <img
              className="w-6 h-6 md:w-7 md:h-7 object-cover"
              alt="Wallet"
              src={accountBalanceWalletIcon}
            />
            <span className="text-base md:text-lg font-bold text-gray-800 ml-2">
              $10.00
            </span>
          </div>

          <Link
            to="/dashboard"
            className={`text-base md:text-lg font-medium ${
              isActive("/dashboard") ? "text-blue-600" : "text-gray-700 hover:text-blue-500"
            } transition-colors`}
          >
            Dashboard
          </Link>
          <Link
            to="/dashboard/withdraw"
            className={`text-base md:text-lg font-medium ${
              isActive("/dashboard/withdraw") ? "text-blue-600" : "text-gray-700 hover:text-blue-500"
            } transition-colors`}
          >
            Withdraw
          </Link>
          <Link
            to="/dashboard/referral"
            className={`text-base md:text-lg font-medium ${
              isActive("/dashboard/referral") ? "text-blue-600" : "text-gray-700 hover:text-blue-500"
            } transition-colors`}
          >
            Referral
          </Link>
          <Link
            to="/dashboard/task-history"
            className={`text-base md:text-lg font-medium ${
              isActive("/dashboard/task-history") ? "text-blue-600" : "text-gray-700 hover:text-blue-500"
            } transition-colors`}
          >
            Task History
          </Link>
        </nav>

        {/* Desktop Icons */}
        <div className="hidden md:flex items-center space-x-4">
          <button
            onClick={toggleNotification}
            className="relative p-2 rounded-full hover:bg-gray-100 transition-colors"
            aria-label="Notifications"
          >
            <Bell size={24} className="text-gray-700" />
            {isNotificationOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-white shadow-lg rounded-md p-4 border border-gray-200">
                <p className="text-sm text-gray-700">No new notifications</p>
              </div>
            )}
          </button>
          
          <Link
            to="/dashboard/profile"
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            aria-label="User profile"
          >
            {userEmail ? (
              <div className="w-10 h-10 flex items-center justify-center bg-blue-100 rounded-full text-lg font-bold text-blue-800">
                {getInitials(userEmail)}
              </div>
            ) : (
              <CircleUserRound size={24} className="text-gray-700" />
            )}
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 rounded-md hover:bg-gray-100 transition-colors"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <div className="space-y-1.5">
            <span className="block w-6 h-0.5 bg-gray-700"></span>
            <span className="block w-6 h-0.5 bg-gray-700"></span>
            <span className="block w-6 h-0.5 bg-gray-700"></span>
          </div>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-40">
          {/* Overlay */}
          <div 
            className="absolute inset-0 bg-black bg-opacity-50"
            onClick={toggleMenu}
          ></div>
          
          {/* Menu Panel */}
          <div className="absolute top-0 right-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-50">
            <div className="flex justify-between items-center p-4 border-b">
              <h2 className="text-xl font-semibold">Menu</h2>
              <button
                onClick={toggleMenu}
                className="p-2 rounded-md hover:bg-gray-100"
                aria-label="Close menu"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>
            
            <nav className="p-4 space-y-3">
              <Link
                to="/dashboard/profile"
                className={`block px-4 py-3 rounded-lg ${
                  isActive("/dashboard/profile") 
                    ? "bg-blue-50 text-blue-600" 
                    : "text-gray-700 hover:bg-gray-100"
                } transition-colors`}
                onClick={toggleMenu}
              >
                Profile
              </Link>
              <Link
                to="/dashboard"
                className={`block px-4 py-3 rounded-lg ${
                  isActive("/dashboard") 
                    ? "bg-blue-50 text-blue-600" 
                    : "text-gray-700 hover:bg-gray-100"
                } transition-colors`}
                onClick={toggleMenu}
              >
                Balance: $10.00
              </Link>
              <Link
                to="/dashboard/withdraw"
                className={`block px-4 py-3 rounded-lg ${
                  isActive("/dashboard/withdraw") 
                    ? "bg-blue-50 text-blue-600" 
                    : "text-gray-700 hover:bg-gray-100"
                } transition-colors`}
                onClick={toggleMenu}
              >
                Withdraw
              </Link>
              <Link
                to="/dashboard/referral"
                className={`block px-4 py-3 rounded-lg ${
                  isActive("/dashboard/referral") 
                    ? "bg-blue-50 text-blue-600" 
                    : "text-gray-700 hover:bg-gray-100"
                } transition-colors`}
                onClick={toggleMenu}
              >
                Referral
              </Link>
              <Link
                to="/dashboard/task-history"
                className={`block px-4 py-3 rounded-lg ${
                  isActive("/dashboard/task-history") 
                    ? "bg-blue-50 text-blue-600" 
                    : "text-gray-700 hover:bg-gray-100"
                } transition-colors`}
                onClick={toggleMenu}
              >
                Task History
              </Link>
            </nav>
          </div>
        </div>
      )}
    </>
  );
}

export default DashboardNavbar;