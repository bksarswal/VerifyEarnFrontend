import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const logoutUser = async () => {
      try {
        // Clear local authentication tokens
        localStorage.removeItem("userToken");
        localStorage.removeItem("userStatus");
        localStorage.removeItem("isAdmin");
        
        // You can add any other cleanup here for your authentication system
        // For example, if using cookies:
        // document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

        alert("User logged out successfully");

        setTimeout(() => {
          navigate("/");
        }, 2000);

      } catch (error) {
        console.error("Logout error: ", error.message);
      }
    };

    logoutUser();
  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h2 className="text-2xl font-semibold">You have been logged out.</h2>
      <p className="mt-2">Redirecting to home page...</p>
    </div>
  );
};

export default Logout;