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