import React, { useState } from "react";
import "../Styles/ForgotPassword.css";
import { ArrowLeft } from "lucide-react"; // Importing the back arrow icon
import { sendCodeToEmail ,verifyOTP,resetPassword} from "../../api/AuthService";
import { ToastNotification,showSuccessToast,showErrorToast } from "../ToastNotification";
import { useNavigate } from "react-router-dom"; // Import useNavigate from react-router-dom

const ForgotPassword = () => {
    const navigate = useNavigate(); // Initialize the navigate hook

  const [step, setStep] = useState(1); // Steps: 1 = Email, 2 = OTP, 3 = New Password
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]); // 6-digit OTP array
  const [newPassword, setNewPassword] = useState("");
  const handleNavigateToLogin = () => {
    navigate("/"); // Replace "/login" with the actual login route in your app
  };

  const handleEmailSubmit = async(e) => {
    e.preventDefault();
    console.log("Reset link sent to:", email);

    try{
        const response = await sendCodeToEmail(email);
        console.log("Response from sendCodeToEmail:", response);
        if(response.success) {
            showSuccessToast("Reset link sent to your email");
            setStep(2); // Move to OTP step
            return true; //
        }

    }catch(error){
        showErrorToast("Failed to send reset link to your email");

        console.log("Error sending code to email:", error);
        return;
    }
  };

  const handleOtpChange = (index, value) => {
    if (/^\d?$/.test(value)) {
      let newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Move focus to the next input if value is filled
      if (value && index < 5) {
        document.getElementById(`otp-input-${index + 1}`).focus();
      }
    }
  };

  const handleOtpBackspace = (index, event) => {
    if (event.key === "Backspace" && otp[index] === "") {
      // Focus previous input if backspace is pressed on an empty input
      if (index > 0) {
        document.getElementById(`otp-input-${index - 1}`).focus();
      }
    }
  };

  const handleOtpPaste = (e) => {
    const value = e.clipboardData.getData("Text").replace(/\D/g, ""); // Strip non-digits
    if (value.length === 6) {
      setOtp(value.split("")); // Automatically fill OTP if 6 digits are pasted
    }
  };

  const handleOtpSubmit = async(e) => {
    e.preventDefault();
    const enteredOtp = otp.join("");
    console.log("OTP Entered:", enteredOtp);

    try{
        const response = await verifyOTP(email,enteredOtp);
        console.log("Response from verifyCode:", response);
        if(response.success) {
            showSuccessToast("OTP verified successfully");
            setStep(3); // Move to New Password step
        }
    }catch(e){
        showErrorToast(e.response.data.error);
        console.log("Error verifying OTP:", e.response.data);
    }
  };

  const handlePasswordSubmit = async(e) => {
    e.preventDefault();
    console.log("New Password Set:", newPassword);
    alert("Password successfully reset!");
    setStep(1); // Reset to email step after completion


    try {
        const response = await resetPassword(email,newPassword);
        
  
        if (response.success) {
          showSuccessToast("Password updated successfully!");
          setEmail("");
          setNewPassword("");
        }
      } catch (error) {
        console.log("Error resetting password:", error);
        showErrorToast(error.response?.data?.message || "An error occurred while resetting the password");
      }
    };
  const handleBack = () => {
    setStep(step - 1); // Decrease the step to go to the previous step
  };

  return (
    <div className="forgot-container">
        <ToastNotification/>


      <div className="forgot-card">
        <div className="forgot-card-body">
          {/* Step 1: Email Submission */}
          {step === 1 && (
            <div className={`forgot-step ${step === 1 ? "slide-in" : "slide-out"}`}>
              <h1 className="forgot-title">Forgot password?</h1>
              <p className="forgot-subtitle">
                Remember your password?
                <span
              className="forgot-link"
              onClick={handleNavigateToLogin} // On click, navigate to login page
              style={{ cursor: "pointer", color: "blue" }}
            >
              Login here
            </span>             </p>
              <form onSubmit={handleEmailSubmit}>
                <label className="forgot-label">Email address</label>
                <input
                  type="email"
                  className="forgot-input"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <button type="submit" className="forgot-button">Send OTP</button>
              </form>
            </div>
          )}

          {/* Step 2: OTP Verification */}
          {step === 2 && (
            <div className={`forgot-step ${step === 2 ? "slide-in" : "slide-out"}`}>
                 <button type="button" className="back-button" onClick={handleBack}>
                <ArrowLeft size={20} />
                Back
              </button>
              <h1 className="forgot-title">Enter OTP</h1>
              <p className="forgot-subtitle">We sent a 6-digit code to {email}</p>
              <form onSubmit={handleOtpSubmit} className="otp-form">
                <div
                  className="otp-container"
                  onPaste={handleOtpPaste} // Enable paste event for OTP
                >
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      id={`otp-input-${index}`}
                      type="text"
                      maxLength="1"
                      className="otp-input"
                      value={digit}
                      onChange={(e) => handleOtpChange(index, e.target.value)}
                      onKeyDown={(e) => handleOtpBackspace(index, e)}
                    />
                  ))}
                </div>
                <button type="submit" className="forgot-button">Verify OTP</button>
              </form>
            </div>
          )}

          {/* Step 3: New Password */}
          {step === 3 && (
            <div className={`forgot-step ${step === 3 ? "slide-in" : "slide-out"}`}>
                 <button type="button" className="back-button" onClick={handleBack}>
                <ArrowLeft size={20} />
                Back
              </button>
              <h1 className="forgot-title">Reset Password</h1>
              <p className="forgot-subtitle">Enter your new password</p>
              <form onSubmit={handlePasswordSubmit}>
                <label className="forgot-label">New Password</label>
                <input
                  type="password"
                  className="forgot-input"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />
                <button type="submit" className="forgot-button">Reset Password</button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
