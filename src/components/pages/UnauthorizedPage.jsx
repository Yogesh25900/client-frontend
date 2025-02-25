import React from "react";
import { Link } from "react-router-dom";

const Unauthorized = () => {
  return (
    <div>
      <h2>Access Denied 🚫</h2>
      <p>You do not have permission to access this page.</p>
      <Link to="/main/home">Go Back to Home</Link>
    </div>
  );
};

export default Unauthorized;
