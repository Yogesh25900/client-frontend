import React, { useEffect,useState } from "react";
import { useOutletContext } from 'react-router-dom';

import { getUserDetails } from "../api/AuthService";


const EditProfile = () => {
  const { userId } = useOutletContext(); // Get the user ID passed from the Dashboard

  // Log userId to ensure it is being passed correctly
  console.log("User ID received in EditProfile:", userId);

  const [userDetails, setUserDetails] = useState(null);
  const [formData, setFormData] = useState({
    name: "John Doe",
    title: "UI/UX Engineer",
    phone: "9910XXXXXX",
    email: "info@example.com",
    website: "www.example.com",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Profile updated successfully!");
  };

  // Run fetchUserData only if userId is valid
  useEffect(() => {
    if (!userId) {
      console.error("User ID is missing!");
      return;
    }

    const fetchUserData = async () => {
      try {
        console.log("Fetching user data for userId:", userId);
        const data = await getUserDetails(12); // Pass the user ID to fetch data
        console.log("Fetched user details:", data); // Log the fetched data for debugging purposes
        setUserDetails(data); // Update state with fetched data if needed
      } catch (error) {
        console.error("Failed to fetch user details:", error);
      }
    };

    fetchUserData();
  }, [userId]); // Only run when userId changes

  return (
    <div className="edit-profile-container">
      {/* Profile Card */}
      <div className="profile-card">
        <div className="profile-header">
          <div className="user-box">
            <img
              src="https://bootdey.com/img/Content/avatar/avatar7.png"
              alt="User Avatar"
            />
          </div>
          <h5 className="profile-name">{formData.name}</h5>
          <h6 className="profile-title">{formData.title}</h6>
        </div>
        <div className="profile-body">
          <ul className="profile-info">
            <li>
              <span className="icon">📞</span>
              <div className="details">
                <span>{formData.phone}</span>
                <small>Mobile Number</small>
              </div>
            </li>
            <li>
              <span className="icon">📧</span>
              <div className="details">
                <span>{formData.email}</span>
                <small>Email Address</small>
              </div>
            </li>
            <li>
              <span className="icon">🌐</span>
              <div className="details">
                <span>{formData.website}</span>
                <small>Website Address</small>
              </div>
            </li>
          </ul>
        </div>
      </div>

      {/* Edit Form */}
      <div className="edit-form">
        <h2>Edit Profile</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label>Title:</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label>Phone:</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label>Website:</label>
            <input
              type="text"
              name="website"
              value={formData.website}
              onChange={handleInputChange}
            />
          </div>
          <button type="submit">Save Changes</button>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
