import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './Chat.css'

const Chat = () => {
  const [userQuery, setUserQuery] = useState('');
  const [assistantReply, setAssistantReply] = useState(''); // Initial placeholder text
  const [chatHistory, setChatHistory] = useState([]);
  const dropdownRef = useRef(null);

  // Fetch chat history on component mount
  useEffect(() => {
    fetchChatHistory();
  }, []);

  // Fetch chat history from the server
  const fetchChatHistory = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/chat-history/get-chat-history');
      setChatHistory(response.data);
    } catch (error) {
      console.error('Error fetching chat history:', error);
    }
  };

  // Handle input change
  const handleInputChange = (e) => {
    setUserQuery(e.target.value);
  };

  const submitQuery = async () => {
    if (!userQuery.trim()) return;  // Prevent sending empty queries
  
    try {
      const response = await axios.post('http://localhost:3000/api/chat-history/save-chat-history', { userQuery });
  
      // Log the entire response to see what data is coming back
      const { chatEntry } = response.data; // Destructure to get chatEntry
      const { user_query, assistant_reply } = chatEntry;

      if (user_query && assistant_reply) {
        setChatHistory((prevHistory) => [{ user_query, assistant_reply }, ...prevHistory]);
        setUserQuery('');
      } else {
        console.error('Response does not contain expected data:');
      }
    } catch (error) {
      console.error('Error sending query:', error);
    }
  };

  // Handle Enter key press for submitting query
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      submitQuery();
    }
  };

  return (
    <div className='chat-main-container'>
      <div className="chat-history">
        {chatHistory.slice(0).reverse().map((chat, index) => (
          <div key={index} className="chat-entry">
            <div className="user-query">
              <strong>User:</strong>
              <p>{chat.user_query}</p>
            </div>
            <div className="assistant-reply">
              <strong>Assistant:</strong>
              <p>{chat.assistant_reply}</p>
            </div>
          </div>
        ))}
      

    </div>
    
    <div className="search-container">
        <input
          type="text"
          placeholder="Type your query here..."
          className="search-box"
          value={userQuery}
          onKeyDown={handleKeyDown}
          onChange={handleInputChange}
        />
        <button className="send-button" onClick={submitQuery}>
          <i className="fas fa-paper-plane"></i>
        </button>
        <button className="voice-button" title="Click to Speak">
          <i className="fas fa-microphone"></i>
        </button>
      </div>
  </div>
  );
};

export default Chat;
