// src/components/TaskModal.jsx
import React, { useState } from 'react';
import './TaskModal.css'
const TaskModal = ({ isOpen, closeModal, addTask }) => {
  const [task, setTask] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    addTask(task);
    setTask('');  // Reset the task input
    closeModal();  // Close the modal after adding the task
  };

  if (!isOpen) return null;  // Don't render the modal if it's not open

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Add Task</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter task"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            required
          />
          <button type="submit">Add Task</button>
          <button type="button" onClick={closeModal}>Close</button>
        </form>
      </div>
    </div>
  );
};

export default TaskModal;
