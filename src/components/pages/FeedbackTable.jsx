import { useState, useEffect } from "react";
import { Trash2, Home } from "lucide-react";
import "../Styles/FeedbackTable.css";
import { getAllFeedback, deleteFeedback } from "../../api/AuthService";
import { useOutletContext } from "react-router-dom";
import { showSuccessToast, showErrorToast } from "../ToastNotification";

const FeedbackTable = () => {
  const userID = useOutletContext() || null;
  const [feedbacks, setFeedbacks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const feedbacksPerPage = 7;
  const totalPages = Math.ceil(feedbacks.length / feedbacksPerPage);

  const indexOfLastFeedback = currentPage * feedbacksPerPage;
  const indexOfFirstFeedback = indexOfLastFeedback - feedbacksPerPage;
  const currentFeedbacks = feedbacks.slice(indexOfFirstFeedback, indexOfLastFeedback);

  useEffect(() => {
    const getFeedbacks = async () => {
      try {
        const feedbacksData = await getAllFeedback();
        setFeedbacks(feedbacksData.feedback);
        console.log("feedback data", feedbacksData);
      } catch (error) {
        console.error("Error fetching feedbacks:", error);
      }
    };

    getFeedbacks();
  }, []); // Empty dependency array ensures this runs only once when the component mounts

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleDelete = async (feedbackID) => {
    try {
      // Call the deleteFeedback API to delete the feedback by its feedbackid
      const result = await deleteFeedback(feedbackID); // deleteFeedback is your API function
      console.log("result", result); // replace with your API function call
  
      if (result.success) {
        // Directly remove the deleted feedback from the state
        setFeedbacks((prevFeedbacks) => prevFeedbacks.filter(feedback => feedback.feedbackID !== feedbackID));
        showSuccessToast("Feedback deleted successfully!");
      } else {
        showErrorToast("Error deleting feedback.");
      }
    } catch (error) {
      console.error("Failed to delete feedback:", error);
      showErrorToast("Error deleting feedback.");
    }
  };
  
  
  return (
    <div className="feedbacks">
      <div className="header-content">
        <div className="header-left">
          <Home className="icon" />
          <span className="separator">/</span>
          <span className="title">Feedback</span>
        </div>
      </div>

      <div className="feedback-container">
        <div className="feedback-header">
        </div>

        <div className="table-wrapper">
          <table className="feedback-table">
            <thead>
              <tr>
                <th>Feedback ID</th>
                <th>Feedback</th>
                <th>User ID</th>
                <th>Submitted At</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentFeedbacks.map((feedback) => (
                <tr key={feedback.feedbackID}>
                  <td>{feedback.feedbackID}</td>
                  <td>{feedback.feedbackContent}</td>
                  <td>{feedback.userID}</td>
                  <td>{feedback.submittedAt}</td>
                  <td>
                    <button className="delete-btn" onClick={() => handleDelete(feedback.feedbackID)}>
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="pagination">
          <button
            className="pagination-button"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index + 1}
              className={`pagination-button ${currentPage === index + 1 ? "active" : ""}`}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </button>
          ))}
          <button
            className="pagination-button"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeedbackTable;
