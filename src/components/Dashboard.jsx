import React from "react";
import { Routes, Route } from "react-router-dom";
import Sidebar from "./Navabr";

import "./Dashboard.css";
import { Outlet } from "react-router-dom";

const Dashboard = () => {
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
