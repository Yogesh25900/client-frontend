import React from "react";
import "./SettingsPage.css";
import DarkModeToggle from "./reusable-ui/DarkModeToggle";
const SettingsPage = () => {
  return (
    <div className="settings-page">
      <h1>Settings</h1>
      <p>Manage your account settings here.</p>
      <div className="settings-options">
        <label>
          <input type="checkbox" />
          Enable Notifications
        </label>
        <label>
          <input type="checkbox" />
          Dark Mode
        </label>
        <DarkModeToggle />
        <button className="save-button">Save Changes</button>
      </div>
    </div>
  );
};

export default SettingsPage;
