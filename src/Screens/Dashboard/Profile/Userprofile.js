import { useState, useEffect } from "react";
import { User, CreditCard, Users, Lock, LifeBuoy, LogOut } from "lucide-react";
import UserInfoForm from "./UserInfoForm";
import AccountDetailsForm from "./AccountDetailsForm";
import SupportSection from "./SupportSection";
import ChangePasswordForm from "./ChangePasswordForm";
import { Link } from "react-router-dom";
import PaymentDetails from "./PaymentDetails";
import ReferralPageProfile from "./Referral";

const UserProfilePage = () => {
  const [activeTab, setActiveTab] = useState("user-info");
  const [menuOpen, setMenuOpen] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [userInitials, setUserInitials] = useState("");

  // Fetch user data from your backend
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Replace with your actual API call:
        // const response = await fetch('/api/user/profile');
        // const data = await response.json();
        
        // Mock data
        const mockEmail = "user@example.com";
        setUserEmail(mockEmail);
        setUserInitials(getInitialsFromEmail(mockEmail));
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  // Function to extract initials from email
  const getInitialsFromEmail = (email) => {
    const username = email.split("@")[0];
    const firstLetter = username[0]?.toUpperCase() || "";
    const secondLetter = username[1]?.toUpperCase() || "";
    return `${firstLetter}${secondLetter}`;
  };

  const menuItems = [
    { id: "user-info", label: "User Information", icon: User },
    { id: "account-details", label: "Account Details", icon: CreditCard },
    { id: "payment", label: "Payment Details", icon: CreditCard },
    { id: "referrals", label: "Referrals", icon: Users },
    { id: "change-password", label: "Change Password", icon: Lock },
    { id: "support", label: "Support/Help", icon: LifeBuoy },
  ];

  return (
    <div className="mt-16 container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Profile Page</h1>
      <div className="flex flex-col md:flex-row gap-6 relative">
        {/* Mobile Sidebar Toggle */}
        <button
          className="md:hidden p-2 mb-4 flex justify-center text-white rounded-lg"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <div className="w-16 h-16 flex items-center justify-center bg-blue-600 text-white rounded-full font-bold">
            {userInitials}
          </div>
        </button>

        {/* Sidebar */}
        <aside
          className={`${
            menuOpen ? "translate-x-0" : "-translate-x-full"
          } md:translate-x-0 fixed md:relative z-50 md:z-auto min-h-64 w-64 bg-[#F2FAFA] p-4 rounded-lg shadow-lg transition-transform ease-in-out md:block`}
        >
          <div className="flex items-center mb-4 p-2">
            <div className="w-12 h-12 flex items-center justify-center bg-blue-600 text-white rounded-full font-bold mr-3">
              {userInitials}
            </div>
            <div className="truncate">
              <p className="font-medium">{userEmail}</p>
            </div>
          </div>
          
          <nav className="space-y-2">
            {menuItems.map((item) => (
              <button
                key={item.id}
                className={`w-full text-left flex items-center p-3 rounded-lg transition-colors duration-200 ${
                  activeTab === item.id 
                    ? "bg-blue-500 text-white" 
                    : "bg-[#c8f1f1] hover:bg-blue-200"
                }`}
                onClick={() => {
                  setActiveTab(item.id);
                  setMenuOpen(false);
                }}
              >
                <item.icon className="mr-2 h-5 w-5" />
                <span className="text-sm">{item.label}</span>
              </button>
            ))}
            <Link 
              to="/logout" 
              className="w-full flex items-center p-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
            >
              <LogOut className="mr-2 h-5 w-5" />
              <span className="text-sm">Logout</span>
            </Link>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 bg-[#F2FAFA] p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">
            {menuItems.find((item) => item.id === activeTab)?.label}
          </h2>
          <div className="mt-4">
            {renderTabContent(activeTab)}
          </div>
        </main>
      </div>
    </div>
  );
};

const renderTabContent = (tab) => {
  switch (tab) {
    case "user-info":
      return <UserInfoForm />;
    case "account-details":
      return <AccountDetailsForm />;
    case "payment":
      return <PaymentDetails />;
    case "referrals":
      return <ReferralPageProfile />;
    case "change-password":
      return <ChangePasswordForm />;
    case "support":
      return <SupportSection />;
    default:
      return <div>Select a tab to view content</div>;
  }
};

export default UserProfilePage;