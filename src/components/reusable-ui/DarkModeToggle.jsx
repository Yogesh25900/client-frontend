import React, { useState, useEffect } from 'react';

const DarkModeToggle = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Check localStorage to see if dark mode is saved
    const savedMode = localStorage.getItem('darkMode') === 'true';
    setIsDarkMode(savedMode);
    if (savedMode) {
      document.body.classList.add('dark-mode');
    }
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => !prevMode);
    if (isDarkMode) {
      document.body.classList.remove('dark-mode');
      localStorage.setItem('darkMode', 'false');
    } else {
      document.body.classList.add('dark-mode');
      localStorage.setItem('darkMode', 'true');
    }
  };

  return (
    <button onClick={toggleDarkMode} className="dark-mode-toggle">
      {isDarkMode ? 'Light Mode' : 'Dark Mode'}
    </button>
  );
};

export default DarkModeToggle;
