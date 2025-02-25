import React, { useState } from "react";
import "../Styles/FeedbackOverlay.css"; // Import CSS for styling
import { showErrorToast } from "../ToastNotification";
const FeedbackOverlay = ({ onClose, onSubmitFeedback }) => {
  const [feedback, setFeedback] = useState("");

  const handleFeedbackChange = (e) => {
    setFeedback(e.target.value);
  };

  const handleSubmit = () => {
    if (!feedback.trim()) {
      // If feedback is empty or just spaces
      showErrorToast("Feedback cannot be empty."); // Show error toast
      return; // Prevent submission
   
    }

    onSubmitFeedback(feedback); // Send feedback to parent or API
    setFeedback(""); // Clear the input after submission
    onClose(); // Close the overlay after submission
  };

  return (
    <div className="feedback-overlay">
      <div className="feedback-container">
      <div className="feedback-overlay-content">
        <h2>Submit Your Feedback</h2>
        <textarea
          value={feedback}
          onChange={handleFeedbackChange}
          placeholder="Write your feedback here..."
          rows="5"
        ></textarea>
        <div className="actions">
          <button id="feedbackmodal-btn" onClick={onClose}>
            Cancel
          </button>
          <button id="feedbackmodal-btn"  onClick={handleSubmit}>
            Submit
          </button>
        </div>
        </div>
      </div>
    </div>
  );
};

export default FeedbackOverlay;
