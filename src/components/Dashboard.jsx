import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Navabr";
import { validateToken } from "../api/AuthService"; // Imported validation function
import "./Dashboard.css";
import { Outlet } from "react-router-dom";
import ToastNotification from './ToastNotification'; // Import the ToastNotification component

const Dashboard = () => {
  const [extractedUserId, setExtractedUserId] = useState(null); // State to hold the extracted userId
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // Track the sidebar state (open or collapsed)
  const navigate = useNavigate();

  useEffect(() => {
    const checkToken = async () => {
      try {
        const response = await validateToken();
        console.log("Token is valid");
        const userId = response.userId; // Assuming the userId is in the response
        console.log("Extracted user id: " + userId);
        setExtractedUserId(userId); // Set the userId in the state
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

  return (
    <div className={`dashboard-container ${isSidebarOpen ? "sidebar-open" : "sidebar-closed"}`}>
      {/* Sidebar */}
      <Sidebar toggleSidebar={toggleSidebar} isOpen={isSidebarOpen} />

      {/* Main Content */}
      <div className={`dashboard-main ${isSidebarOpen ? "expanded" : "collapsed"}`}>
        {/* Toast Notification */}
        <ToastNotification /> {/* Render it here */}

        {/* Passing extractedUserId as context to the Outlet */}
        <Outlet context={extractedUserId} />
      </div>
    </div>
  );
};

export default Dashboard;
