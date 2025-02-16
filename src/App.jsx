import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import HomePage from "./components/HomePage";
import ProfilePage from "./components/ProfilePage";
import SettingsPage from "./components/SettingsPage";
import UserTables from "./components/UserTables";
import ImageUploadForm from "./components/ImageUploadForm ";
import TaskTable from "./components/TaskTable";
import Chat from "./components/Chat";
import './App.css'
import EditProfile from "./components/EditProfile";
import Login from "./components/pages/LoginSignup";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        {/* Remove the `/dashboard` part */}
        <Route path="/main" element={<Dashboard />}>
          <Route path="home" element={<HomePage />} />
          <Route path="chat-with-ai" element={<Chat />} />

          <Route path="profile" element={<ProfilePage />} />
          <Route path="settings" element={<SettingsPage />} />
          <Route path="user-tables" element={<UserTables />} /> {/* Add new route */}
          <Route path="task" element={<TaskTable />} /> {/* Add new route */}


        </Route>
        {/* Direct route for settings */}
      </Routes>
    </Router>
  );
}

export default App;
