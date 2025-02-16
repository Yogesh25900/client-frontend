import React, { useState } from "react";
import "../Styles/FeedbackOverlay.css"; // Import CSS for styling

const FeedbackOverlay = ({ onClose, onSubmitFeedback }) => {
  const [feedback, setFeedback] = useState("");

  const handleFeedbackChange = (e) => {
    setFeedback(e.target.value);
  };

  const handleSubmit = () => {
    onSubmitFeedback(feedback); // Send feedback to parent or API
    setFeedback(""); // Clear the input after submission
    onClose(); // Close the overlay after submission
  };

  return (
  
      <div className="feedback-overlay">
        <div className="feedback-overlay-content">
        
          <h2>Submit Your Feedback</h2>
          <textarea
            value={feedback}
            onChange={handleFeedbackChange}
            placeholder="Write your feedback here..."
            rows="5"
          ></textarea>
          <div className="actions">
            <button className="cancel-btn" onClick={onClose}>
              Cancel
            </button>
            <button className="submit-btn" onClick={handleSubmit}>
              Submit
            </button>
          </div>
        </div>
      </div>
    )
 
};

export default FeedbackOverlay;
