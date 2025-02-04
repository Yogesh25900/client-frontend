import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './Chat.css'
import { useOutletContext } from 'react-router-dom';

const Chat = () => {
  const userid = useOutletContext() || null;
  const [querytext, setquerytext] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [currentReplyIndex, setCurrentReplyIndex] = useState(null); // Track which reply is being typed
  const chatContainerRef = useRef(null); 

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    if (userid) fetchChatHistory();
  }, [userid]);

  const fetchChatHistory = async () => {
    try {
      const response = await axios.post('http://localhost:3000/api/chat-history/get-chat',{userid});
      setChatHistory(Array.isArray(response.data) ? response.data : []);
      scrollToBottom(); 
    } catch (error) {
      console.error('Error fetching chat history:', error);
    }
  };

  const typeLetterByLetter = (text, index) => {
    let currentIndex = 0;
    setIsTyping(true);

    const interval = setInterval(() => {
      setChatHistory((prevHistory) => {
        const newHistory = [...prevHistory];
        newHistory[index] = { ...newHistory[index], currentReply: newHistory[index].response[0].responsetext.substring(0, currentIndex + 1) };
        return newHistory;
      });
      currentIndex++;
      if (currentIndex === text.length) {
        clearInterval(interval);
        setIsTyping(false);
      }
    }, 100); // Adjust the speed here (ms)
  };

  const handleInputChange = (e) => {
    setquerytext(e.target.value);
  };

  const submitQuery = async () => {
    if (!querytext.trim()) return; // Prevent sending empty queries

    try {
      const res = await axios.post('http://localhost:3000/api/chat-history/save-chat', { userid, querytext });

      const { query, response } = res.data;
      if (!query || !response) return;

      const assistantResponseText = response.responsetext || 'No response received';

      setquerytext(''); // Reset input field

      fetchChatHistory();

      // Start typing effect for the assistant's reply
      const currentIndex = chatHistory.length;
      setCurrentReplyIndex(currentIndex); // Set current chat history index
      typeLetterByLetter(assistantResponseText, currentIndex);

    } catch (error) {
      console.error('Error sending query:', error);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      submitQuery();
    }
  };

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatHistory]); 

  return (
    <div className='chat-main-container'>
      <div className="chat-history" ref={chatContainerRef}>
        {chatHistory.slice(0).map((chat, index) => (
          <div key={index} className="chat-entry">
            <div className="user-query">
              <strong>User:</strong>
              <p>{chat.querytext}</p> {/* Display the user query */}
            </div>
            {chat.response && chat.response.length > 0 && (
              <div className="assistant-reply">
                <strong>Assistant:</strong>
                <p>
                  {chat.currentReply ? chat.currentReply : chat.response[0].responsetext}
                  {/* Show the assistant's current reply during typing effect */}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="search-container">
        <textarea
          type="text"
          placeholder="Type your query here..."
          className="search-box"
          value={querytext}
          onKeyDown={handleKeyDown}
          onChange={handleInputChange}
        />
        <div className="button-container">
    <div className="send-button" onClick={submitQuery}>
      <i className="fas fa-paper-plane"></i> {/* Send Icon */}
    </div>
    <div className="voice-button" title="Click to Speak">
      <i className="fas fa-microphone"></i> {/* Microphone Icon */}
    </div>
  </div>
      </div>
    </div>
  );
};

export default Chat;
