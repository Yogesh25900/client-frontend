import { useState, useEffect } from "react";
import { Pencil, Trash2, Plus, Home, X } from "lucide-react";
import "./TaskTable.css";
import { fetchUserTasks, addTask, updateTask,deleteTask } from "../api/AuthService"; 
import { useOutletContext } from 'react-router-dom';
import { showSuccessToast, showErrorToast } from "./ToastNotification"; 
import DatePicker from "react-datepicker"; 
import "react-datepicker/dist/react-datepicker.css"; 

const TaskTable = () => {
  const userID = useOutletContext() || null;
  const [tasks, setTasks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [editOverlay, setEditOverlay] = useState(false);
  const [updateTrigger, setUpdateTrigger] = useState(false); 

  const [addTaskOverlay, setAddTaskOverlay] = useState(false); 
  const [editingTask, setEditingTask] = useState(null); 
  const [newTask, setNewTask] = useState({
    taskname: "",
    taskdescription: "",
    dueDate: "",
    status: "Pending",
  });

  const tasksPerPage = 6;
  const totalPages = Math.ceil(tasks.length / tasksPerPage);

  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = tasks.slice(indexOfFirstTask, indexOfLastTask);

  useEffect(() => {
    const getTasks = async () => {
      try {
        const tasksData = await fetchUserTasks(userID);
        setTasks(tasksData);
        console.log(tasksData);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    if (userID) {
      getTasks();
    }
  }, [userID, updateTrigger]);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleEdit = (task) => {
    const formattedDueDate = task.due_date ? new Date(task.due_date) : null; // Convert string to Date object

    setEditingTask({
      ...task,
      dueDate: formattedDueDate, // Set the Date object for dueDate
    });
    setEditOverlay(true);
  };

  const handleDelete = async (taskid) => {
    try {
      // Call the deleteTask API to delete the task by its taskid
      const result = await deleteTask(taskid); // deleteTask is your API function
      console.log(result.message); // You can display a success message or refresh the list
      // Optionally: Remove the deleted task from the state to update the UI
      setTasks((prevTasks) => prevTasks.filter(task => task.taskid !== taskid));
    } catch (error) {
      console.error("Failed to delete task:", error);
    }
  };
  

  const handleAdd = () => {
    const newTask = {
      // id: tasks.length + 1,
      taskname: "",
      taskdescription: "",
      dueDate: "",
      status: "Pending",
    };
    setNewTask(newTask); 
    setAddTaskOverlay(true);
  };

  const handleOverlayClose = () => {
    setEditOverlay(false);
    setAddTaskOverlay(false);
    setEditingTask(null);
    setNewTask({ taskname: "", taskdescription: "", dueDate: "", status: "Pending" });
  };





  const handleSaveEdit = async () => {

    // Format the due_date properly
    const formattedDueDate = new Date(editingTask.dueDate);
    formattedDueDate.setMinutes(formattedDueDate.getMinutes() - formattedDueDate.getTimezoneOffset());
    const updatedTask = {
        taskid: editingTask.taskid,
        taskname: editingTask.taskname,
        taskdescription: editingTask.taskdescription,
        due_date: formattedDueDate.toISOString().split('T')[0], // Ensure correct format
        status: editingTask.status,
    };

    try {
        const updatedTaskResponse = await updateTask(
            updatedTask.taskid,
            updatedTask.taskname,
            updatedTask.taskdescription,
            updatedTask.status,
            updatedTask.due_date
        );

        if (updatedTaskResponse) {
            setTasks(tasks.map((task) => (task.taskid === updatedTaskResponse.taskid ? updatedTaskResponse : task)));
            setEditOverlay(false);
            setUpdateTrigger((prev) => !prev);

            showSuccessToast("Task updated successfully!");
        } else {
            showErrorToast("Failed to update task. Please try again.");
        }
    } catch (error) {
        console.error("Error updating task:", error);
        showErrorToast("Error updating task.");
    }
};

  const handleAddTaskChange = (e) => {
    const { name, value } = e.target;
    setNewTask({ ...newTask, [name]: value });
  };

  const handleSaveAddTask = async () => {
    
    const newTaskToAdd = {
      taskname: newTask.taskname,
      taskdescription: newTask.taskdescription,
      status: newTask.status,
      due_date: newTask.dueDate,
    };

    try {
      const addedTask = await addTask(userID,
         newTaskToAdd.taskname,
         newTaskToAdd.taskdescription,
         newTaskToAdd.status,
         newTaskToAdd.due_date);


      if (addedTask) {
        setTasks([...tasks, addedTask]);
        showSuccessToast("Task added successfully!");
      } else {
        showErrorToast("Failed to add task. Please try again.");
      }
    } catch (error) {
      console.error("Error adding task:", error);
      showErrorToast("Error adding task.");
    }

    handleOverlayClose(); 
  };

  return (
    <div className="tasks">
      <div className="header-content">
        <div className="header-left">
          <Home className="icon" />
          <span className="separator">/</span>
          <span className="title">Tasks</span>
        </div>
      </div>

      <div className="task-container">
        <div className="task-header">
          <h2>Tasks</h2>
          <button className="add-btn" onClick={handleAdd}>
            <Plus size={16} /> Add Task
          </button>
        </div>

        <div className="table-wrapper">
          <table className="task-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Description</th>
                <th>Due Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentTasks.map((task) => (
                <tr key={task.taskid}>
                  <td>{task.taskid}</td>
                  <td>{task.taskname}</td>
                  <td>{task.taskdescription}</td>
                  <td>{task.due_date}</td>
                  <td>{task.status}</td>
                  <td>
                    <button className="edit-btn" onClick={() => handleEdit(task)}>
                      <Pencil size={16} />
                    </button>
                    <button className="delete-btn" onClick={() => handleDelete(task.taskid)}>
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

      {addTaskOverlay && (
        <div className="overlay">
          <div className="overlay-content">
            <h3>Add Task</h3>
            <button className="close-btn" onClick={handleOverlayClose}>
              <X size={20} />
            </button>
            <input
              type="text"
              name="taskname"
              value={newTask.taskname}
              onChange={handleAddTaskChange}
              placeholder="Task Name"
            />
            <textarea
              name="taskdescription"
              value={newTask.taskdescription}
              onChange={handleAddTaskChange}
              placeholder="Task Description"
            />
            <input
              type="date"
              name="dueDate"
              value={newTask.dueDate ? String(newTask.dueDate) : ""}
              onChange={handleAddTaskChange}
            />
            <select
              name="status"
              value={newTask.status}
              onChange={handleAddTaskChange}
            >
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
            <button className="save-btn" onClick={handleSaveAddTask}>
              Save Task
            </button>
          </div>
        </div>
      )}

      {editOverlay && (
        <div className="overlay">
          <div className="overlay-content">
            <h3>Edit Task</h3>
            <button className="close-btn" onClick={handleOverlayClose}>
              <X size={20} />
            </button>
            <input
              type="text"
              value={editingTask.taskname}
              onChange={(e) => setEditingTask({ ...editingTask, taskname: e.target.value })}
              placeholder="Task Name"
            />
            <textarea
              value={editingTask.taskdescription}
              onChange={(e) => setEditingTask({ ...editingTask, taskdescription: e.target.value })}
              placeholder="Task Description"
            />
            <DatePicker
              selected={editingTask.dueDate ? new Date(editingTask.dueDate) : null} // Ensure it's a valid date
              onChange={(date) => setEditingTask({ ...editingTask, dueDate: date })}
              dateFormat="yyyy-MM-dd"
            />
            <select
              value={editingTask.status}
              onChange={(e) => setEditingTask({ ...editingTask, status: e.target.value })}
            >
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
            <button className="save-btn" onClick={handleSaveEdit}>
              Save Changes
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskTable;
