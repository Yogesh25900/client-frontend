import React, { useState } from "react";
import { HomeIcon, BarChart2, CirclePlus, Settings, UserCircle, MessageSquareQuote, LogIn, ListTodo, Menu } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import "./Navbar.css";
import FeedbackOverlay from "./reusable-ui/FeedbackOverlay ";
import { addFeedback } from "../api/AuthService";
import { showSuccessToast, showErrorToast } from './ToastNotification'; // Import your toast functions
import axios from 'axios';

const Sidebar = ({ toggleSidebar, isOpen ,userID}) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [isFeedbackModalOpen, setFeedbackModalOpen] = useState(false);

  const navigate = useNavigate();

  const handleFeedbackClick = () => {
    console.log('Feedback modal opened');
    setFeedbackModalOpen(true);
  };

  const handleCloseFeedback = () => {
    setFeedbackModalOpen(false);
  };

  const handleLogoutClick = () => {
    setModalOpen(true);
  };

  const handleConfirmLogout = () => {
    handleLogout();
    setModalOpen(false);
  };

  const handleCancelLogout = () => {
    setModalOpen(false);
  };

  const handleLogout = async () => {
    try {
      // Make an API call to the backend to clear the cookie
      await axios.post('http://localhost:3000/api/users/logout', {}, { withCredentials: true });
  
      // Remove token from local storage if stored there
     
      console.log(sessionStorage.getItem('token'));
      sessionStorage.removeItem('token');
      console.log('loggin out');
      // Redirect to login page
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };


  const [feedbackData, setFeedbackData] = useState("");


  const handleSubmitFeedback = async (feedback) => {
    console.log("Feedback received:", feedback);  // You can process the feedback here

    // Optionally store the feedback in state
    setFeedbackData(feedback);

    // Send feedback to API
    try {
     // Replace 'userID' with the actual cookie key you're using
      const response = await addFeedback(userID, feedback); // Send feedback to the API

      if (response) {
        showSuccessToast('Feedback submitted successfully!');

      } else {
        showErrorToast('Error submitting feedback. Please try again.');

        console.error('Error submitting feedback');
      }
    } catch (error) {
      showErrorToast('Error submitting feedback. Please try again.');

      console.error('Error submitting feedback to the API:', error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!feedbackContent) {
      alert("Please enter your feedback!");
      return;
    }

    handleSubmitFeedback(feedbackContent);  // Send feedback content to the handler
  };

  return (
    <div className={`sidebar ${isOpen ? "open" : "collapsed"}`}>
      {/* Hamburger Button */}
      <div className="logo">
        <span className="logo-text">CHIME AI</span>
        <button className="hamburger" onClick={toggleSidebar}>
          <Menu size={24} />
        </button>
      </div>

      {/* Main Navigation */}
      <nav>
        <div className="nav-section">
          <NavItem icon={<HomeIcon size={20} />} label="Dashboard" to="/main/home" isOpen={isOpen} />
          <NavItem icon={<BarChart2 size={20} />} label="Users" to="/main/user-tables" isOpen={isOpen} />
          <NavItem icon={<CirclePlus size={20} />} label="Chat with AI" to="/main/chat-with-ai" isOpen={isOpen} />
          <NavItem icon={<ListTodo size={20} />} label="Task" to="/main/task" isOpen={isOpen} />
          <NavItemForNone
            icon={<MessageSquareQuote size={20} />}
            label="Feedback"
          
            onClick={handleFeedbackClick}
          />
          <NavItem icon={<Settings size={20} />} label="Settings" to="/main/settings" isOpen={isOpen} />
        </div>

        {/* Account Pages Section */}
        <div className="account-section">
          <h3 className="account-title">ACCOUNT PAGES</h3>
          <div className="nav-section">
            <NavItem icon={<UserCircle size={20} />} label="Profile" to="/main/profile" isOpen={isOpen} />
            <NavItemForNone
              icon={<LogIn size={20} />}
              label="Log out"
             
            
              // Set active state to false to prevent it from being marked active

              onClick={handleLogoutClick}
            />
          </div>
        </div>
      </nav>

      {/* Feedback Modal */}
      {isFeedbackModalOpen && (
        <FeedbackOverlay onClose={handleCloseFeedback}
        onSubmitFeedback={handleSubmitFeedback} 
        />
      )}

      {/* Modal for Logout Confirmation */}
      {isModalOpen && (
        <div className="navbar-modal-overlay">
          <div className="navbar-modal-content">
            <p className="text-black">Are you sure want to log out?</p>
            <button onClick={handleConfirmLogout}>Yes</button>
            <button onClick={handleCancelLogout}>No</button>
          </div>
        </div>
      )}
    </div>
  );
};

const NavItem = ({ icon, label, to, isOpen, onClick }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`}
      onClick={onClick}
    >
      <div className="icon">{icon}</div>
      {isOpen && <span>{label}</span>}
    </NavLink>
  );
};

const NavItemForNone = ({ icon, label, onClick }) => {
  return (
    <NavLink
    className ="NavItemForNone"
            
      onClick={onClick}
    >
      <div className="icon">{icon}</div>
     <span>{label}</span>
    </NavLink>
  );
};

export default Sidebar;
