import React, { useState } from "react";
import {
  HomeIcon,
  BarChart2,
  CirclePlus,
  Settings,
  UserCircle,
  MessageSquareQuote,
  LogIn,
  ListTodo,
  Menu,
} from "lucide-react";
import "./Navbar.css";
import { NavLink } from "react-router-dom";

const Sidebar = ({ toggleSidebar, isOpen }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const handleLogoutClick = () => {
    setModalOpen(true);
  };
  const handleConfirmLogout = () => {
    handleLogout()
    setModalOpen(false);
    

  };

  const handleCancelLogout = () => {
    setModalOpen(false);
  };
  
  const handleLogout = () => {
    Cookies.remove("token"); // Remove token
    navigate("/"); // Redirect to home page
  };
  return (
    <div className={`sidebar ${isOpen ? "open" : "collapsed"}`}>
      {/* Hamburger Button */}
      

      {/* Logo */}
        <div className="logo">
          <span className="logo-text">CHIME AI</span>
          <button className="hamburger" onClick={toggleSidebar}>
        <Menu size={24} />
      </button>
        </div>

      {/* Main Navigation */}
      <nav>
        <div className="nav-section">
          <NavItem icon={<HomeIcon size={20} />} label="Dashboard" to="/dashboard/" isOpen={isOpen} />
          <NavItem icon={<BarChart2 size={20} />} label="Users" to="/dashboard/user-tables" isOpen={isOpen} />
          <NavItem icon={<CirclePlus size={20} />} label="Chat with AI" to="/dashboard/chat-with-ai" isOpen={isOpen} />
          <NavItem icon={<ListTodo size={20} />} label="Task" to="/dashboard/task" isOpen={isOpen} />
          <NavItem icon={<MessageSquareQuote size={20} />} label="Feedback" to="/dashboard/feedback" isOpen={isOpen} />
          <NavItem icon={<Settings size={20} />} label="Settings" to="/dashboard/settings" isOpen={isOpen} />
        </div>

        {/* Account Pages Section */}
        <div className="account-section">
          <h3 className="account-title">ACCOUNT PAGES</h3>
          <div className="nav-section">
            <NavItem icon={<UserCircle size={20} />} label="Profile" to="/dashboard/profile" isOpen={isOpen} />
            <NavItem
        icon={<LogIn size={20} />}
        label="Log out"
        to="#"
        isOpen={isOpen}
        onClick={handleLogoutClick}
      />          </div>
        </div>
      </nav>
      {isModalOpen && (
        <div className="navbar-modal-overlay">
          <div className="navbar-modal-content">
            <p>Are you sure you want to log out?</p>
            <button onClick={handleConfirmLogout}>Yes</button>
            <button onClick={handleCancelLogout}>No</button>
          </div>
        </div>
      )}
    </div>
  );
};

const NavItem = ({ icon, label, to, isOpen }) => {
  return (
    <NavLink to={to} className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`}>
      <div className="icon">{icon}</div>
      {isOpen && <span>{label}</span>}
    </NavLink>
  );
};

export default Sidebar;
