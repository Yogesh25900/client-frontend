// LogoutModal.js
import React from 'react';
import '../Styles/LogoutModal.css'; // Add your CSS file for styling

const LogoutModal = ({  handleConfirmLogout, handleCancelLogout }) => {

  return (
    <div className="navbar-modal-overlay">
      <div className="navbar-modal-content">
        <p className="text-black">Are you sure you want to log out?</p>
        <button id = "logoutmodal-btn"onClick={handleConfirmLogout}>Yes</button>
        <button id="logoutmodal-btn" onClick={handleCancelLogout}>No</button>
      </div>
    </div>
  );
};

export default LogoutModal;
