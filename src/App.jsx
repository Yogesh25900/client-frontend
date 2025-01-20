// src/App.jsx
import React, { useState } from 'react';  // Make sure you import useState
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './components/TestDashboard';
import Home from './components/Home'; // Import the Home component
import Chat from './components/Chat';
import EditProfile from './components/EditProfile';
import './App.css'
import TaskModal from './components/TaskModal'; // Import the TaskModal

const App = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tasks, setTasks] = useState([]);

  const openModal = () => {
    setIsModalOpen(true);  // Open modal
  };

  const closeModal = () => {
    setIsModalOpen(false);  // Close modal
  };

  const addTask = (task) => {
    setTasks([...tasks, task]);  // Add task to the task list
  };

  return (
    <Router>
       <div className="app">
       <Navbar openModal={openModal} /> {/* Pass openModal function to Navbar */}
        
        <div className="maincontainer">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Dashboard" element={<Dashboard />} />
            <Route path="/edit-profile" element={<EditProfile />} />
          </Routes>
        </div>
      </div>
      <TaskModal 
        isOpen={isModalOpen} 
        closeModal={closeModal} 
        addTask={addTask}
      />
    </Router>
  );
};

export default App;
