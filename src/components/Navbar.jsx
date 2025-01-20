import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './navbar.css';
import appIcon from '../assets/logo.svg';
import homeIcon from '../assets/home.png';
import dashboardIcon from '../assets/dashboard.png';
import generateIcon from '../assets/generate.png';
import settingsIcon from '../assets/settings.png';
import notificationIcon from '../assets/notification.png';
import profileIcon from '../assets/profile.png';

const Navbar = ({ openModal }) => {
  // State for controlling visibility of dropdowns
  const [homeDropdownVisible, setHomeDropdownVisible] = useState(false);
  const [dashboardDropdownVisible, setDashboardDropdownVisible] = useState(false);
  const [generateDropdownVisible, setGenerateDropdownVisible] = useState(false);
  const [settingsDropdownVisible, setSettingsDropdownVisible] = useState(false);

  return (
    <div className='app-container'>
    <div className="navbar">
      <ul className="navbar-left">
        <NavLink to="/">
          <img src={appIcon} alt="App Logo" className="appicon" />
        </NavLink>

        {/* Home Dropdown */}
        <li 
          className="navbar-item dropdown" 
          onMouseEnter={() => setHomeDropdownVisible(true)} 
          onMouseLeave={() => setHomeDropdownVisible(false)}
        >
          <NavLink to="/" className={({ isActive }) => (isActive ? "navbar-link active" : "navbar-link")}>
            <div className="icon-text-container">
              <img src={homeIcon} alt="Home" className="icon" />
              <span>Home</span>
            </div>
          </NavLink>
          {homeDropdownVisible && (
            <ul className="dropdown-menu">
              <li key="submenu1"><NavLink to="/home/sub1">Submenu 1</NavLink></li>
              <li key="submenu2"><NavLink to="/home/sub2">Submenu 2</NavLink></li>
              <li key="submenu3"><NavLink to="/home/sub3">Submenu 3</NavLink></li>
            </ul>
          )}
        </li>

        {/* Dashboard Dropdown */}
        <li 
          className="navbar-item dropdown" 
          onMouseEnter={() => setDashboardDropdownVisible(true)} 
          onMouseLeave={() => setDashboardDropdownVisible(false)}
        >
          <NavLink to="/dashboard" className={({ isActive }) => (isActive ? "navbar-link active" : "navbar-link")}>
            <div className="icon-text-container">
              <img src={dashboardIcon} alt="Dashboard" className="icon" />
              <span>Dashboard</span>
            </div>
          </NavLink>
          {dashboardDropdownVisible && (
            <ul className="dropdown-menu">
              <li key="submenu1"><NavLink to="/dashboard/sub1">Submenu 1</NavLink></li>
              <li key="submenu2"><NavLink to="/dashboard/sub2">Submenu 2</NavLink></li>
            </ul>
          )}
        </li>

        {/* Generate Dropdown */}
        <li 
          className="navbar-item dropdown" 
          onMouseEnter={() => setGenerateDropdownVisible(true)} 
          onMouseLeave={() => setGenerateDropdownVisible(false)}
        >
          <NavLink to="/generate" className={({ isActive }) => (isActive ? "navbar-link active" : "navbar-link")}>
            <div className="icon-text-container">
              <img src={generateIcon} alt="Generate" className="icon" />
              <span>Generate</span>
            </div>
          </NavLink>
          {generateDropdownVisible && (
            <ul className="dropdown-menu">
              <li key="submenu1"><NavLink to="/generate/sub1">Submenu 1</NavLink></li>
              <li key="submenu2"><NavLink to="/generate/sub2">Submenu 2</NavLink></li>
            </ul>
          )}
        </li>

        <li>
        <NavLink to="#" onClick={openModal}className={({ isActive }) => (isActive ? "navbar-link active" : "navbar-link")}>
          <div className="icon-text-container">
            <span>Task</span>
          </div>
        </NavLink>
        </li>
        
        {/* Settings Dropdown */}
        <li 
          className="navbar-item dropdown" 
          onMouseEnter={() => setSettingsDropdownVisible(true)} 
          onMouseLeave={() => setSettingsDropdownVisible(false)}
        >
          <NavLink to="/settings" className={({ isActive }) => (isActive ? "navbar-link active" : "navbar-link")}>
            <div className="icon-text-container">
              <img src={settingsIcon} alt="Settings" className="icon" />
              <span>Settings</span>
            </div>
          </NavLink>
          {settingsDropdownVisible && (
            <ul className="dropdown-menu">
              <li key="submenu1"><NavLink to="/settings/sub1">Submenu 1</NavLink></li>
              <li key="submenu2"><NavLink to="/settings/sub2">Submenu 2</NavLink></li>
            </ul>
          )}
        </li>
       
      </ul>

      <div className="navbar-right">
        <div className="icon-container">
          <img src={notificationIcon} alt="Notifications" className="icon" />
          <NavLink to="/edit-profile" className="profile-link">
        <img src={profileIcon} alt="Profile" className="icon" />
      </NavLink>
              </div>
      </div>
    </div>
    </div>
  );
};

export default Navbar;
