import React, { useState } from "react";
import "../Styles/MultiStepForm.css"; // Assuming your styles are stored here

function App() {
  const [currentStep, setCurrentStep] = useState(1);
  const [email, setEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [password, setPassword] = useState("");
  
  const totalSteps = 3;
  
  // Calculate progress based on current step
  const progress = (currentStep / totalSteps) * 100;

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(prevStep => prevStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(prevStep => prevStep - 1);
    }
  };

  return (
    <div className="form-container">
      <h1>Multi-step Form</h1>

      <div className="progress-bar-container">
        <div className="progress-bar" style={{ width: `${progress}%` }}></div>
      </div>

      <div className="form-container">
        <div className={`form-step step-${currentStep} fade`}>
          {currentStep === 1 && <Step1 email={email} setEmail={setEmail} />}
          {currentStep === 2 && <Step2 verificationCode={verificationCode} setVerificationCode={setVerificationCode} />}
          {currentStep === 3 && <Step3 password={password} setPassword={setPassword} />}
        </div>
        
        <div className="buttons">
          {currentStep > 1 && <button onClick={handleBack}>Back</button>}
          {currentStep < totalSteps ? (
            <button onClick={handleNext}>Next</button>
          ) : (
            <button>Submit</button>
          )}
        </div>
      </div>
    </div>
  );
}

function Step1({ email, setEmail }) {
  return (
    <div className="step">
      <h2>Step 1: Enter your email</h2>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
        required
      />
    </div>
  );
}

function Step2({ verificationCode, setVerificationCode }) {
  return (
    <div className="step">
      <h2>Step 2: Verify your code</h2>
      <input
        type="text"
        value={verificationCode}
        onChange={(e) => setVerificationCode(e.target.value)}
        placeholder="Enter verification code"
        required
      />
      <button onClick={() => alert("Code sent!")}>Send Code</button>
    </div>
  );
}

function Step3({ password, setPassword }) {
  return (
    <div className="step">
      <h2>Step 3: Update your password</h2>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Enter new password"
        required
      />
    </div>
  );
}

export default App;
