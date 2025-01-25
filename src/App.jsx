import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import HomePage from "./components/HomePage";
import ProfilePage from "./components/ProfilePage";
import SettingsPage from "./components/SettingsPage";
import UserTables from "./components/UserTables";
import './App.css'
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        {/* Remove the `/dashboard` part */}
        <Route path="/dashboard" element={<Dashboard />}>
          <Route path="home" element={<HomePage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="settings" element={<SettingsPage />} />
          <Route path="user-tables" element={<UserTables />} /> {/* Add new route */}

        </Route>
        {/* Direct route for settings */}
      </Routes>
    </Router>
  );
}

export default App;
