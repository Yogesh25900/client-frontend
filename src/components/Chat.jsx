import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './Chat.css';
import { useOutletContext } from 'react-router-dom';

const Chat = () => {
  const userID = useOutletContext() || null;
  const [querytext, setQueryText] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const chatContainerRef = useRef(null);

  useEffect(() => {
    if (userID) fetchChatHistory();
  }, [userID]);

  useEffect(() => {
    scrollToBottom();
  }, [chatHistory]);

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  };

  const fetchChatHistory = async () => {
    try {
      const response = await axios.post('http://localhost:3000/api/chat-history/get-chat', { userID });
      if (Array.isArray(response.data)) {
        setChatHistory(response.data);
        console.log('chat history',response.data);
      } else {
        setChatHistory([]);
      }
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

        if (newHistory[index]?.response) {
          newHistory[index] = {
            ...newHistory[index],
            currentReply: text.substring(0, currentIndex + 1),
          };
        }

        return newHistory;
      });

      currentIndex++;

      if (currentIndex === text.length) {
        clearInterval(interval);
        setIsTyping(false);
      }
    }, 100);
  };

  const handleInputChange = (e) => {
    setQueryText(e.target.value);
  };

  const submitQuery = async () => {
    if (!querytext.trim()) return;

    try {
      const res = await axios.post('http://localhost:3000/api/chat-history/save-chat', { userID, querytext });
      const { query, response } = res.data;

      if (!query || !response) return;

      const newChatEntry = {
        query: query,
        response: response,
        currentReply: '', // Empty initially for typing effect
      };

      setChatHistory((prevHistory) => [...prevHistory, newChatEntry]);
      setQueryText('');

      typeLetterByLetter(response.responsetext, chatHistory.length);
    } catch (error) {
      console.error('Error sending query:', error);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      submitQuery();
    }
  };

  return (
    <div className='chat-main-container'>
      <div className="chat-history" ref={chatContainerRef}>
        {chatHistory.map((chat, index) => (
          <div key={index} className="chat-entry">
            <div className="user-query">
              <strong>User:</strong>
              <p>{chat.query.querytext}</p>
            </div>
            {chat.response && (
              <div className="assistant-reply">
                <strong>Assistant:</strong>
                <p className='whitespace-preline'>{chat.currentReply ? chat.currentReply : chat.response.responsetext}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="search-container">
        <textarea
          placeholder="Type your query here..."
          className="search-box"
          value={querytext}
          onKeyDown={handleKeyDown}
          onChange={handleInputChange}
        />
        <div className="button-container">
          <div className="send-button" onClick={submitQuery}>
            <i className="fas fa-paper-plane"></i>
          </div>
          <div className="voice-button" title="Click to Speak">
            <i className="fas fa-microphone"></i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
