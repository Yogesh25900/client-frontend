import { React, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Navabr";
import { validateToken } from "../api/AuthService"; // Imported validation function
import "./Dashboard.css";
import { Outlet } from "react-router-dom";

const Dashboard = () => {
  const [extractedUserId, setExtractedUserId] = useState(null); // State to hold the extracted userId
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

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <div className="dashboard-sidebar">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="dashboard-main">
        {/* Passing extractedUserId as context to the Outlet */}
        <Outlet context={extractedUserId} />
      </div>
    </div>
  );
};

export default Dashboard;
