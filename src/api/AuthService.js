import axios from 'axios';

const API_URL = 'http://localhost:3000/'; // Backend URL

// Register a new user
export const registerUser = (userData) => {
  return axios.post(`${API_URL}api/users/signup`, userData); // Register endpoint
};

// Login a user
export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(
      `${API_URL}api/users/login`, 
      { email, password },
      { withCredentials: true }
    );
    return response.data; // Return the response data (if needed)
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Login failed');
  }
};

// Logout a user
export const logoutUser = () => {
  localStorage.removeItem('token'); // or sessionStorage, depending on your use case
  // Redirect or perform other actions as needed
};

// Fetch all users with pagination
export const fetchAllUsers = async (token, currentPage = 1, usersPerPage = 5) => {
  try {
    const response = await axios.get(`${API_URL}api/users/`, {
      headers: { Authorization: `Bearer ${token}` },
      params: { page: currentPage, limit: usersPerPage },
    });
    return response.data;  // Expecting { users: [], totalUsers: 0 }
  } catch (error) {
    console.error('Error fetching all users:', error);
    throw error;
  }
};

// Validate the token
export const validateToken = async () => {
  try {
    const response = await axios.get(`${API_URL}auth/verify-token`, { withCredentials: true });
    // console.log(response.data); // Log to see what is returned from the backend

    return response.data;  // Token is valid, return the response data
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Token validation failed');
  }
};

export const getUserDetails = async (userId) => {
  try {
    const response = await axios.get(`http://localhost:3000/api/users/user-details/${userId}`, {
      withCredentials: true, // Include cookies in the request
    });
    return response.data; // Return the user details from the response
  } catch (error) {
    throw error; // Handle or throw error to be caught in the component
  }
};


export const updateUserDetails = async (userId, userData) => {
  const response = await axios.put(`${API_URL}api/users/${userId}`, userData);
  return response.data;
};



//tasks
export const fetchUserTasks = async (userID) => {
  try {
    const response = await axios.post(`${API_URL}api/tasks/`,{userID});
    return response.data; // Returns the list of tasks
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return [];
  }
};


export const addTask = async (userID, taskname, taskdescription, status, due_date) => {
  try {
    const response = await axios.post(`${API_URL}api/tasks/createtask`, {
      userID,
      taskname,
      taskdescription,
      status,
      due_date
    });

    return response.data; // Returns the created task object
  } catch (error) {
    console.error("Error adding task:", error);
    return null; // Returns null if there's an error
  }
};





export const updateTask = async (taskid, taskname, taskdescription, status, due_date) => {
  try {
    // Convert due_date to YYYY-MM-DD format if it's not already
    const formattedDate = new Date(due_date).toISOString().split('T')[0];

    const response = await axios.put(`${API_URL}api/tasks/updatetask/${taskid}`, {
      taskname,
      taskdescription,
      status,
      due_date: formattedDate, // Ensure proper date format
    });

    return response.data; // Return success message or updated task
  } catch (error) {
    console.error("Error updating task:", error);

    // Extract a meaningful error message
    throw error.response?.data?.error || "Failed to update task"; 
  }
};



export const deleteTask = async (taskid) => {
  try {
    // Send a DELETE request to the server to delete the task with the provided taskid
    const response = await axios.delete(`${API_URL}api/tasks/deletetask/${taskid}`);

    // Return the success message from the API response
    return response.data;
  } catch (error) {
    console.error("Error deleting task:", error);

    // Extract and throw a meaningful error message
    throw error.response?.data?.error || "Failed to delete task";
  }
};
