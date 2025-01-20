import React, { useState } from "react";
import "./EditProfile.css";

const EditProfile = () => {
  const [formData, setFormData] = useState({
    name: "John Doe",
    title: "UI/UX Engineer",
    phone: "9910XXXXXX",
    email: "info@example.com",
    website: "www.example.coms",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Profile updated successfully!");
  };

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
