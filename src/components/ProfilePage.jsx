import React from "react";
import "./ProfilePage.css";

const ProfilePage = () => {
  return (
    <div className="profile-page">
      <h1>Profile Page</h1>
      <p>Welcome to your profile. Here you can view and update your information.</p>
      <div className="profile-details">
        <h3>Name: John Doe</h3>
        <h3>Email: john.doe@example.com</h3>
        <button className="update-button">Update Profile</button>
      </div>
    </div>
  );
};

export default ProfilePage;
