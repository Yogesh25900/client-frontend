import React from "react";
import {
  HomeIcon,
  BarChart2,
  CreditCard,
  Settings,
  UserCircle,
  LogIn,
  UserPlus,
  Star,
} from 'lucide-react';
import './Navbar.css'; // Import the CSS file
import { NavLink } from 'react-router-dom';  // Import NavLink for navigation

const Sidebar = () => {
  return (
    <div className="sidebar">
      {/* Logo */}
      <div className="logo">
        <div className="logo-icon" />
        <span className="logo-text">VISION UI FREE</span>
      </div>
      
      {/* Main Navigation */}
      <nav>
        <div className="nav-section">
          <NavItem icon={<HomeIcon size={20} />} label="Dashboard" to="/dashboard/home" />
          <NavItem icon={<BarChart2 size={20} />} label="Tables" to="/dashboard/user-tables" />
          <NavItem icon={<CreditCard size={20} />} label="Billing" to="/billing" />
          <NavItem icon={<Settings size={20} />} label="RTL" to="/rtl" />
        </div>

        {/* Account Pages Section */}
        <div className="account-section">
          <h3>ACCOUNT PAGES</h3>
          <div className="nav-section">
            <NavItem icon={<UserCircle size={20} />} label="Profile" to="/dashboard/profile" />
            <NavItem icon={<LogIn size={20} />} label="Sign In" to="/signin" />
            <NavItem icon={<UserPlus size={20} />} label="Sign Up" to="/signup" />
          </div>
        </div>
      </nav>

      {/* Help Section */}
      <div className="help-section">
        <div className="help-icon">
          <Star size={20} className="star-icon" />
        </div>
        <h3>Need help?</h3>
        <p>Please check our docs</p>
        <button>DOCUMENTATION</button>
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
