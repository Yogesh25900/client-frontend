// src/components/Home.jsx
import React from 'react';
import './Home.css'; // Create a CSS file for styling

const Home = () => {
  return (
    <div className="home-card-container">
      <div className="home-card">
        <h2>Welcome to the Home Page</h2>
        <p>This is the home page content displayed inside a card.</p>
      </div>
    </div>
  );
};

export default Home;
