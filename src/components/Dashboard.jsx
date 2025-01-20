import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './Header';  // Your Header component
import Sidebar from './Sidebar';  // Your Sidebar component
import Chat from './Chat';  // Example Component
import About from './About';  // Example Component
import Login from './Login';  // Login Component

function Dashboard() {
  // State to control the visibility of the sidebar
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);

  // Function to toggle sidebar visibility
  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  const [isLoggedIn, setIsLoggedIn] = useState(true); // Track login state

  // Handle the login button click
  const handleLoginClick = () => {
    setIsLoggedIn(true); // Set to true when the login button is clicked
  };

  return (
    <Router>
      <div className={`dashboard-container ${isSidebarVisible ? '' : 'sidebar-hidden'}`}>
        {/* If not logged in, show the Login page */}
        {!isLoggedIn ? (
          <Login onLoginClick={handleLoginClick} />
        ) : (
          <>
            {/* Navbar */}
            <div className='navbar'>
              <Header onToggleSidebar={toggleSidebar} onLoginClick={handleLoginClick} /> 
            </div>

            {/* Sidebar Component */}
            <div className={`sidebar ${isSidebarVisible ? 'block' : 'hidden'}`}>
              <Sidebar />
            </div>

            {/* Main Content */}
            <div className='main-container'>
              <Routes>
                <Route path="/" element={<Chat />} /> {/* Render Chat */}
                <Route path="/about" element={<About />} /> {/* Render About */}
              </Routes>
            </div>
          </>
        )}
      </div>
    </Router>
  );
}

export default Dashboard;
