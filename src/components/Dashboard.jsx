import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Navabr";
import Cookies from "js-cookie";

import { validateToken } from "../api/AuthService"; // Imported validation function
import "./Dashboard.css";
import { Outlet } from "react-router-dom";
import ToastNotification from './ToastNotification'; // Import the ToastNotification component

const Dashboard = () => {
  const [userType, setUserType] = useState(null); // Change to "user" for normal users
  useEffect(() => {
    const role = Cookies.get("role"); // Get role from cookies
    setUserType(role); // Default to "user" if not found
  }, []);

  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // Track the sidebar state (open or collapsed)
  const navigate = useNavigate();
  const [userId, setUserId] = useState(null); // State to hold the user's id

  useEffect(() => {
    const checkToken = async () => {
      try {
        const response = await validateToken();
        console.log("Token is valid");

        setUserId(response.userId); // Set the userId in the state
      } catch (error) {
        console.error("Token validation failed:", error);
        navigate("/"); // Redirect to login if token is invalid
      }
    };

    checkToken(); // Call the function to check token validity
  }, [navigate]);

  // Toggle the sidebar state (open/close)
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Render the dashboard content only when userId is available
  if (!userId) {
    return <div>Loading...</div>; // Or show a loading spinner or something else
  }

  return (
    <div className={`dashboard-container ${isSidebarOpen ? "sidebar-open" : "sidebar-closed"}`}>
      {/* Sidebar */}
      <Sidebar userID={userId} toggleSidebar={toggleSidebar} isOpen={isSidebarOpen} userType={userType} />

      {/* Main Content */}
      <div className={`dashboard-main ${isSidebarOpen ? "expanded" : "collapsed"}`}>
        {/* Toast Notification */}
        <ToastNotification /> {/* Render it here */}

        {/* Passing userId as context to the Outlet */}
        <Outlet context={userId} />
      </div>
    </div>
  );
};

export default Dashboard;
