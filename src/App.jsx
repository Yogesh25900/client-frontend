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
import Login from "./components/pages/LoginSignup";
import EmailVerificationForm from "./components/pages/EmailVerificationForm";
import MultiStepForm from "./components/pages/MultiStepForm";
import FeedbackTable from "./components/pages/FeedbackTable";
import ProtectedRoute from "./routes/ProtectedRoute";
import Unauthorized from "./components/pages/UnauthorizedPage";
import ForgotPassword from "./components/pages/ForgotPassword";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="forgot-password" element={<ForgotPassword />} />
        <Route path="form" element={<MultiStepForm />} />

         <Route path="/unauthorized" element={<Unauthorized />} />

        <Route path="/main" element={<Dashboard />}>
          <Route path="home" element={<HomePage />} />
          <Route path="chat-with-ai" element={<Chat />} />

          <Route element={<ProtectedRoute allowedRoles={["2"]} />}>
  <Route path="feedback-table" element={<FeedbackTable />} />
  <Route path="user-tables" element={<UserTables />} />
</Route>


          <Route path="profile" element={<ProfilePage />} />
          <Route path="settings" element={<SettingsPage />} />
          {/* <Route path="user-tables" element={<UserTables />} /> Add new route */}
          <Route path="task" element={<TaskTable />} /> {/* Add new route */}


        </Route>
        {/* Direct route for settings */}
      </Routes>
    </Router>
  );
}

export default App;
