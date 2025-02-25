import React, { useState } from "react";
import axios from "axios";
import "../Styles/EmailVerification.css"; // Ensure this file has the relevant CSS

const EmailVerificationForm = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [currentStep, setCurrentStep] = useState(1);

  const handleEmailSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:3000/email/send-verification-email", { email });
      if (response.status === 200) {
        setMessage("Verification email sent! Please check your inbox.");
        setCurrentStep(2); // Move to step 2 (Verification Code Form)
      }
    } catch (error) {
      setMessage("Error sending email. Please try again.");
    }
  };

  return (
    <div className="email-verification-form">
      <h3>Email Verification</h3>

      <div className={`form-step ${currentStep === 1 ? 'active' : ''}`}>
        <form onSubmit={handleEmailSubmit}>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit">Send Verification Email</button>
        </form>
      </div>

      {currentStep === 2 && (
        <div className="form-step active">
          <VerificationCodeForm email={email} />
        </div>
      )}

      {message && <p>{message}</p>}
    </div>
  );
};

const VerificationCodeForm = ({ email }) => {
  const [code, setCode] = useState("");
  const [statusMessage, setStatusMessage] = useState("");

  const handleVerificationSubmit = async (e) => {
    e.preventDefault();

    try {
        console.log(email,code)
      const response = await axios.post("http://localhost:3000/email/verify-code", { email, code });
      console.log(response)
      if (response.status === 200) {
        setStatusMessage("Email verified successfully!");
      }
    } catch (error) {
        console.log(error)
      setStatusMessage("Invalid code or expired.");
    }
  };

  return (
    <div>
      <h3>Enter Verification Code</h3>
      <form onSubmit={handleVerificationSubmit}>
        <input
          type="text"
          placeholder="Enter verification code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          required
        />
        <button type="submit">Verify Code</button>
      </form>

      {statusMessage && <p>{statusMessage}</p>}
    </div>
  );
};

export default EmailVerificationForm;
