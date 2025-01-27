import {React, useEffect} from "react";
import { Routes, Route ,useNavigate} from "react-router-dom";
import Sidebar from "./Navabr";
const jwtDecode = await import("jwt-decode").then((module) => module.default);
import axios from 'axios';

import "./Dashboard.css";
import { Outlet } from "react-router-dom";

const Dashboard = () => {
//   const navigate = useNavigate();

//   useEffect(() => {

//   const validateToken = async () => {
//     try {
//       await axios.get('http://localhost:3000/auth/verify-token', { withCredentials: true });
//       console.log("Token is valid");
//     } catch (error) {
//       console.error("Token validation failed:", error.response?.data?.message || error.message);
//       navigate('/'); // Redirect to login if validation fails
//     }
//   };

//   validateToken();
// }, [navigate]);
  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <div className="dashboard-sidebar">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="dashboard-main">
      <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
