import React, { useState } from "react";
import { Bell, MessageCircle, Sun, X } from "lucide-react";
import './ProfilePage.css';

 const ProfilePage = () => {
    const [inputs, setInputs] = useState([]);
    const [currentInput, setCurrentInput] = useState("");
    const [finalList, setFinalList] = useState([]);
    const handleInputChange = (e) => {
        setCurrentInput(e.target.value);
      };
    
      // Add a new input field to the list
      const addNewInputField = () => {
        setInputs([...inputs, ""]);
      };
    
      // Finalize the current input and add it to the list
      const finalizeInput = (index) => {
        if (currentInput.trim()) {
          setFinalList([...finalList, currentInput]);
          setInputs(inputs.filter((_, i) => i !== index)); // Remove the input field
          setCurrentInput(""); // Clear the input
        }
      };
  return (
    <div className="app-container">
      <div className="max-width-container">
        <header className="header">
          <div className="header-left">
            <h1 className="title">Edit User Profile</h1>
            <a href="#" className="preview-link">Preview</a>
          </div>
          <div className="header-right">
            <button className="icon-btn">
              <Sun className="icon" />
            </button>
            <button className="icon-btn">
              <MessageCircle className="icon" />
            </button>
            <button className="icon-btn">
              <Bell className="icon" />
            </button>
          </div>
        </header>
        <div className="content">
          <div className="profile-section">
            <div className="profile-header">
              <div className="profile-image-container">
                <img
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt="Profile"
                  className="profile-image"
                />
                <div className="profile-actions">
                  <p className="label">Your Name</p>
                  <p className="description">This will be displayed on your profile</p>
                  <div className="action-buttons">
                    <button className="upload-btn">Upload New</button>
                  </div>
                </div>
              </div>
              <div className="cover-image-container">
               
              </div>
            </div>
            <div className="form-section">
              <div className="form-item">
                <label className="label">Full Name</label>
                <input type="text" className="inputprofile" placeholder="Enter your full name" />
              </div>
              <div className="form-item">
                <label className="label">Email address</label>
                <input type="email" className="inputprofile" placeholder="Enter your email" />
              </div>
              <div className="form-item">
                <label className="label">Mobile number</label>
                <input type="tel" className="inputprofile" placeholder="Enter your mobile number" />
              </div>
              <div className="form-item">
                <label className="label">Address</label>
                <input type="text" className="inputprofile" placeholder="Enter your Address" />
                </div>
                <div className="formbuttonsave">
                <button className="save-btn">Save</button>
        
              </div>
            </div>
          </div>
          <div className="bio-section">
            <div className="bio-card">
              <h2 className="section-title">Bio</h2>
              <textarea className="textarea" placeholder="Write something about yourself..."></textarea>
              <h2 className="section-title">Industry/Interests</h2>
              <div className="tags-container">
                {[
                  "UI Design",
                  "Framer",
                  "Startups",
                  "UX",
                  "Crypto",
                  "Mobile Apps",
                  "Webflow",
                ].map((tag) => (
                  <span key={tag} className="tag">
                    {tag}
                    <X className="icon" />
                  </span>
                ))}
              </div>
              <button className="add-more-btn">+ Add more</button>
            </div>
            <div className="bio-card">
              <h2 className="section-title">Social Media accounts</h2>
              <div className="social-media-inputs">
                <input type="url" className="inputprofile" placeholder="Twitter URL" />
                <input type="url" className="inputprofile" placeholder="Instagram URL" />
                <input type="url" className="inputprofile" placeholder="LinkedIn URL" />
              </div>
              <button className="add-more-btn">+ Add more</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default ProfilePage;