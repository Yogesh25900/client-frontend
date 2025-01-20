import React, { useState, useRef, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link,NavLink } from 'react-router-dom';
import "./Dashboard.css"
import { useNavigate } from 'react-router-dom'; // Import the useNavigate hook

const Header = ({ onToggleSidebar ,onLoginClick }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const dropdownRef = useRef(null);


  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };


  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  


  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const navigate = useNavigate(); // Initialize the navigate function

  // Function to handle the button click and navigate to login page


  

  return (
    <header>
    <nav className="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
      <div className="max-w-screen-xl flex items-center justify-between mx-auto p-4">
        {/* Sidebar toggle button (Top-left corner) */}
        <button
          onClick={onToggleSidebar}
          className="fixed top-4 left-4 bg-blue-500 text-white p-2 rounded-full z-10"
        >
          {isSidebarVisible ? (
            <i className="fas fa-times"></i> // Close icon (X)
          ) : (
            <i className="fas fa-bars"></i> // Hamburger menu icon
          )}
        </button>

        {/* Logo and Navbar Links */}
        <a className="flex items-center space-x-3 rtl:space-x-reverse">
          <img src="https://flowbite.com/docs/images/logo.svg" className="h-8" alt="Flowbite Logo" />
          <span className="aurora-text self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            Chat Agent
          </span>
        </a>

        {/* Navbar buttons (Login and Mobile Menu) */}
        <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse space-x-4">
        <button
            type="button"
            onClick={onLoginClick} // Add onClick handler

            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 "
          >
            Login
          </button>

          {/* Dropdown Menu */}
          <div className="relative"> {/* Parent container */}
          <button
onClick={toggleDropdown} // Toggle dropdown on click
className="flex items-center space-x-2 bg-gray-700 hover:bg-gray-600 px-3 py-2 rounded"
>
<img
src="https://via.placeholder.com/32" // Replace with profile picture URL
alt="Profile"
className="w-8 h-8 rounded-full"
/>
<span>Profile</span>
</button>

{isDropdownOpen && (

<div
ref={dropdownRef}
className={`absolute right-0 mt-2 w-40 bg-wheat text-black shadow-lg rounded-lg transition-all duration-300 ease-in-out`}
>
<a href="/profile" className="block px-4 py-2 hover:bg-gray-100">
View Profile
</a>
<a href="/settings" className="block px-4 py-2 hover:bg-gray-100">
Settings
</a>
<a href="/logout" className="block px-4 py-2 hover:bg-gray-100">
Logout
</a>
</div>
  )}

</div>


          {/* Mobile Menu Button */}
          <button
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-sticky"
            aria-expanded={isMenuOpen ? "true" : "false"}
            onClick={toggleMenu} // Toggle the menu on button click
          >
            <span className="sr-only">Open main menu</span>
            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
            </svg>
          </button>
        </div>

        {/* Mobile menu dropdown (if active) */}
        <div className={`items-center justify-between w-full md:flex md:w-auto md:order-1 ${isMenuOpen ? "block" : "hidden"}`} id="navbar-sticky">
          <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
         

          <li>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    isActive
                      ? "block py-2 px-3 text-blue-700 bg-blue-100 rounded md:bg-transparent md:p-0 md:dark:text-blue-500"
                      : "block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                  }
                >
                  Chat
                </NavLink>
          </li>

            <li>
           

            <NavLink
                      to="/about"
                      className={({ isActive }) =>
                        isActive
                          ? "block py-2 px-3 text-blue-700 bg-blue-100 rounded md:bg-transparent md:p-0 md:dark:text-blue-500"
                          : "block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                      }
                    >
                      About
            </NavLink>
            </li>
            <li>
              <a href="#" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">
                Services
              </a>
            </li>
            <li>
              <a href="#" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">
                Contact
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    </header>

  );
};

export default Header;
