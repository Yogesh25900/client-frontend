import React from "react";
import {
  HomeIcon,
  BarChart2,
  CirclePlus,
  Settings,
  UserCircle,
  MessageSquareQuote,
  LogIn,
  UserPlus,
  Star,
} from 'lucide-react';
import './Navbar.css'; // Import the CSS file
import { NavLink } from 'react-router-dom';  // Import NavLink for navigation

const Sidebar = () => {
  return (
    <div className="appcontainer">

    <div className="sidebar">
      {/* Logo */}
      <div className="logo">
        <div className="logo-icon" />
        <span className="logo-text">CHIME AI</span>
      </div>
      
      {/* Main Navigation */}
      <nav>
        <div className="nav-section">
          <NavItem icon={<HomeIcon size={20} />} label="Dashboard" to="/dashboard/" />
          <NavItem icon={<BarChart2 size={20} />} label="Users" to="/dashboard/user-tables" />
          <NavItem icon={<CirclePlus size={20} />} label="Chat with AI" to="/dashboard/chat-with-ai" />

          <NavItem icon={<MessageSquareQuote size={20} />} label="Feedback" to="/dashboard/feedback" />
          <NavItem icon={<Settings size={20} />} label="Settings" to="/dashboard/settings" />
        </div>

        {/* Account Pages Section */}
        <div className="account-section">
          <h3>ACCOUNT PAGES</h3>
          <div className="nav-section">
            <NavItem icon={<UserCircle size={20} />} label="Profile" to="/dashboard/profile" />
            <NavItem icon={<LogIn size={20} />} label="Log out" to="/signin" />
            <NavItem icon={<UserPlus size={20} />} label="Invite" to="/signup" />
          </div>
        </div>
      </nav>

      {/* Help Section */}
      <div className="help-section">
      <div className="help-header">

        <div className="help-icon">
          <Star size={20} className="star-icon" />
        </div>
        <h3 className="help-text">Need help?</h3>
        </div>

        <p className="help-description">Please check our docs</p>
        </div>
    </div>
    </div>
  );
};

const NavItem = ({ icon, label, to }) => {
  return (
    <NavLink
      to={to}  // Use NavLink for navigation
      className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`} // Adds "active" class when the link is active
    >
      <div className="icon">{icon}</div>
      <span>{label}</span>
    </NavLink>
  );
};

export default Sidebar;
