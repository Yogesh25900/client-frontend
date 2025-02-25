import React, { useState, useEffect } from 'react';
import { Bell, MessageCircle, Sun, X } from "lucide-react";
import { validateToken, getUserDetails, updateUserDetails } from "../api/AuthService"; // Assuming you have these API functions
import './ProfilePage.css';
import { useOutletContext, useNavigate } from "react-router-dom";
import axios from 'axios';
import ToastNotification, { showSuccessToast,showErrorToast  } from "./ToastNotification";
import { Toaster } from "react-hot-toast";

const ProfilePage = () => {
  const extractedUserId = useOutletContext() || null;
  const [userid, setUserid] = useState(null);
  const [user, setUser] = useState({
    name: "",
    email: "",
    mobileNumber: "",
    profilePicture: "",
    address: "",
  });
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null); // For showing success messages
  const [image, setImage] = useState(null); // To store the selected file
  const [preview, setPreview] = useState(); // To store the preview URL for the image

  const navigate = useNavigate();

  // Check token validity and extract userId
  const checkToken = async () => {
    try {
      const response = await validateToken();
      console.log("Token is valid");
      const userId = response.userId; // Assuming userId is in the response
      console.log("Extracted user id from profile: " + userId);
      setUserid(userId); // Set userId in the state
    } catch (error) {
      console.error("Token validation failed from profile:", error);
      navigate("/"); // Redirect to login if token is invalid
    }
  };

  // Fetch user details from the backend
  const fetchUserDetails = async () => {
    try {
      const userDetails = await getUserDetails(extractedUserId || userid); // Fallback to `userid` if `extractedUserId` is null
      console.log(userDetails.user);
      setUser(userDetails.user); // Store user details in state
      setPreview(userDetails.user.profilePicture); // Store
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch user details");
    }
  };

  // Check token validity when the component mounts
  useEffect(() => {
    checkToken();
  }, [navigate]); // Dependency: navigate

  // Fetch user details after `userid` is set
  useEffect(() => {
    if (userid || extractedUserId) {
      fetchUserDetails();
    }
  }, [userid, extractedUserId]); // Dependencies: userid or extractedUserId

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  // Handle file selection
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImage(file);

    // Generate a preview URL for the selected image
    const filePreview = URL.createObjectURL(file);
    setPreview(filePreview); // This will show the image preview


    
  };

  // Handle file upload submission
  const handleSubmit = async (e) => {
    e.preventDefault();


    if (!image) {
      return;
    }

    const formData = new FormData();
    formData.append("image", image);

    try {
      const res = await axios.post("http://localhost:3000/api/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      

      // setMessage(`Image uploaded successfully: ${res.data.filePath}`);
      user.profilePicture = res.data.filePath;
      showSuccessToast("Image uploaded successfully");

      console.log("new profile picture: " + res.data.filePath);
      await handleSave(); // This will update the profile in the database

    } catch (error) {
      showErrorToast("Failed to upload image")
      console.error("Error uploading image:", error);
      setMessage("Failed to upload image. Please try again.");
    }
  };

  const handleSave = async () => {
    try {
      if (!/^\d{10}$/.test(user.mobileNumber)) {
        return showErrorToast("Phone number must be exactly 10 digits!");
      } 
      const response = await updateUserDetails(userid, user); // API call to update user
      showSuccessToast("Profile updated successfully")
      // setMessage("Profile updated successfully!"); // Show success message
      setError(null); // Clear any errors
    } catch (err) {
      // setError(err.response?.data?.message || "Failed to update profile");
      setMessage(null); // Clear success message
      showErrorToast("Error Updating Profile!");

    }
  };

 

  return (
    <div className="profile-page-container">
            <Toaster position="top-center" /> {/* Position toast at top-center */}

      <div className="max-width-container">
        <header className="header">
          <div className="header-left">
            <h1 className="profile-title">Edit User Profile</h1>
          </div>
      
        </header>
        <div className="content">
          <div className="profile-section">
            <div className="profile-header">
              <div className="profile-image-container">
              <img
                  src={ preview?preview: `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || "User")}&background=random`}
                  alt={user?.name || "User"}
                  className="profile-image"
                />
                <div className="profile-actions">
                  <p className="profile-label">{user?.name || "Your Name"}</p>
                  <p className="description">This will be displayed on your profile</p>
                  <div className="action-buttons">
                 
                  <label htmlFor="file-upload" className="file-input-label">
                         Choose Image
                    </label>
                      <input
                      type="file"
                  id="file-upload"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="file-input"/>
<span className="file-name">{image ? image.name : "No file chosen"}</span>

            <button className="upload-btn" onClick={handleSubmit}>Upload New</button>
          {/* <ToastNotification />               */}
      </div>
                </div>
              </div>
            
            </div>
            <div className="form-section">
              <div className="form-item">
                <label className="label">Full Name</label>
                <input
                  type="text"
                  name="name"
                  className="inputprofile"
                  value={user.name}
                  onChange={handleInputChange}
                  placeholder="Enter your full name"
                />
              </div>
              <div className="form-item">
                <label className="label">Email address</label>
                <input
                  type="email"
                  name="email"
                  className="inputprofile"
                  value={user.email}
                  onChange={handleInputChange}
                  placeholder="Enter your email"
                />
              </div>
              <div className="form-item">
                <label className="label">Mobile number</label>
                <input
                  type="tel"
                  name="mobileNumber"
                  className="inputprofile"
                  value={user.mobileNumber}
                  onChange={handleInputChange}
                  placeholder="Enter your mobile number"
                />
              </div>
              <div className="form-item">
                <label className="label">Address</label>
                <input
                  type="text"
                  name="address"
                  className="inputprofile"
                  value={user.address}
                  onChange={handleInputChange}
                  placeholder="Enter your Address"
                />
              </div>
              <div className="formbuttonsave">
                <button className="save-btn" onClick={handleSave}>Save</button>
                {/* {message && <p className="success-message">{message}</p>}
                {error && <p className="error-message">{error}</p>} */}
              </div>
            </div>
          </div>
         
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
