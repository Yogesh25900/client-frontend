import React, { useState } from "react";
import "../Styles/LoginStyle.css";
import { loginUser, registerUser } from "../../api/AuthService";
import { useNavigate,NavLink } from "react-router-dom";
import Cookies from "js-cookie";

const LoginSignup = () => {
    const navigate = useNavigate();

  const [isSignUpMode, setIsSignUpMode] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const togglePasswordVisibility = () => {
    setPasswordVisible(!isPasswordVisible);
  };
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      if (isSignUpMode) {
        await registerUser(formData.name, formData.email, formData.password);
        setSuccess("Account created successfully!");
        setTimeout(() => setSuccess(""), 3000);

      } else {
        const response = await loginUser(formData.email, formData.password);
        console.log(response);

    
          
        navigate('/main/home');  // Redirect to the dashboard after login
       
        setSuccess("Login successful!");
        setTimeout(() => setSuccess(""), 3000);

      }
      setFormData({ name: "", email: "", password: "" }); // Reset form
    } catch (err) {
      setError(err.message);
      setTimeout(() => setError(""), 3000);

    }
    setTimeout(() => setSuccess(""), 3000);

  };

  return (
    <div className={`container ${isSignUpMode ? "sign-up-mode" : ""}`}>
      <div className="forms-container">
        <div className="signin-signup">
          {/* Sign In Form */}
          <form className="sign-in-form" onSubmit={handleSubmit}>
            <h2 className="title">Log In</h2>
            <div className="input-field">
              <i className="fas fa-user"></i>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
              />
              <label for="email">Email</label>

            </div>
            <div className="input-field">
              <i className="fas fa-lock"></i>
              <input
                type={isPasswordVisible ? 'text' : 'password'}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
              />
              <label for="password">Password</label>
              <i
  className={`fas password-toggle-icon ${isPasswordVisible ? 'fa-eye-slash' : 'fa-eye'}`}
  onClick={togglePasswordVisibility}
></i>

            </div>
            {error && <p className="error">{error}</p>}
            {success && <p className="success">{success}</p>}
            <NavLink to='/forgot-password' className="hyperlink-text">Forgot Password  </NavLink>

            <button type="submit" className="btn solid">Login</button>
          </form>

          {/* Sign Up Form */}
          <form className="sign-up-form" onSubmit={handleSubmit}>
            <h2 className="title">Sign Up</h2>
            <div className="input-field">
              <i className="fas fa-user"></i>
              <input
                type="text"
                name="name"
                placeholder="Username"
                value={formData.name}
                onChange={handleChange}
              />
              <label for="name">Name</label>

            </div>
            <div className="input-field">
              <i className="fas fa-envelope"></i>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
              />
              <label for="email">Email</label>

            </div>
            <div className="input-field">
              <i className="fas fa-lock"></i>
              <input
                type={isPasswordVisible ? 'text' : 'password'}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
              />
              <label for="password">Password</label>
              <i
  className={`fas password-toggle-icon ${isPasswordVisible ? 'fa-eye-slash' : 'fa-eye'}`}
  onClick={togglePasswordVisibility}
></i>
            </div>
            {error && <p className="error">{error}</p>}
            {success && <p className="success">{success}</p>}
            <button type="submit" className="btn">Sign Up</button>
          </form>
        </div>
      </div>
      {/* Panels Container */}
      <div className="panels-container">
        <div className="panel left-panel">
          <div className="content">
            <h3>New here?</h3>
            <p>Create an account to begin your journey with us.</p>
            <button
              className="btn transparent"
              onClick={() => setIsSignUpMode(true)}
            >
              Sign Up
            </button>
          </div>
        </div>
        <div className="panel right-panel">
          <div className="content">
            <h3>Welcome Back!</h3>
            <p>Sign in to continue your journey with us.</p>
            <button
              className="btn transparent"
              onClick={() => setIsSignUpMode(false)}
            >
              Sign In
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;


