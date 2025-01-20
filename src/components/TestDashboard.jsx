import React, { useEffect, useState } from "react";
import "./testdashboard.css"; // Import the CSS file for styling
import axios from "axios";
import moment from "moment";
import Chat from "./Chat";
import { FaTrashAlt } from 'react-icons/fa'; // Import a delete icon from react-icons

const Dashboard = () => {
  const [history, setHistory] = useState([]);
  const [filteredHistory, setFilteredHistory] = useState([]);
  const [filter, setFilter] = useState('today'); // Default filter is 'today'

  useEffect(() => {
    // Fetch chat history from the backend
    const fetchChatHistory = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/chat-history/get-chat-history'); // Adjust the URL if needed
        setHistory(response.data);
      } catch (error) {
        console.error("Error fetching chat history:", error);
      }
    };

    fetchChatHistory();
  }, []);

  useEffect(() => {
    // Filter chat history based on the selected filter
    const filterHistory = () => {
      let filtered = [...history];

      const todayStart = moment().startOf('day');
      const yesterdayStart = moment().subtract(1, 'day').startOf('day');

      switch (filter) {
        case 'today':
          filtered = filtered.filter(item => moment(item.created_at).isSame(todayStart, 'day'));
          break;
        case 'yesterday':
          filtered = filtered.filter(item => moment(item.created_at).isSame(yesterdayStart, 'day'));
          break;
        case 'datewise':
          // You can add custom date filtering logic here
          break;
        default:
          break;
      }

      setFilteredHistory(filtered);
    };

    filterHistory();
  }, [history, filter]);

  const handleDelete = async (id) => {
    try {
      // Send DELETE request to backend to delete the item
      await axios.delete(`http://localhost:3000/api/chat-history/delete-chat-history/${id}`);
      // Remove the item from the state
      setHistory(history.filter(item => item.id !== id));
    } catch (error) {
      console.error("Error deleting chat history:", error);
    }
  };

  return (
    <div className="dashboard-content">
     

       <div className="history-container">
         <div className="history-title">
          <h3>History</h3>        </div>
        {/* Display chat history */}
        {history.length > 0 ? (
          history.map((item) => (
            <div key={item.id} className="history-item">
              <div className="user-message">
                <p><strong>User:</strong> {item.user_query}</p>
              </div>

              {/* Delete icon */}
              <div className="delete-icon" onClick={() => handleDelete(item.id)}>
                <FaTrashAlt />
              </div>
            </div>
          ))
        ) : (
          <p>No chat history available.</p>
        )}
      </div>

      <div className="card-container">
        <h2>Chat</h2>
        <Chat />
      </div>
    </div>
  );
};

export default Dashboard;
