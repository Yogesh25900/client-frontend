import axios from 'axios';

const API_URL = 'http://localhost:3000/'; // Match your backend URL

// Register a new user
export const registerUser = (userData) => {
  return axios.post(`${API_URL}api/users/signup`, userData); // Register endpoint
};

// Login a user
export const loginUser = async (data) => {
  return await axios.post('http://localhost:3000/api/users/login', data, {
    withCredentials: true, // Include cookies in the request
  });
};
// Fetch user profile (protected route)
export const fetchUserProfile = async (token) => {
  try {
    const response = await axios.get(`${API_URL}auth/fetch-profile`, {
      headers: { Authorization: `Bearer ${token}` }, // Include token
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching profile:', error);
  }
};
export const logoutUser = () => {
  localStorage.removeItem('token'); // or sessionStorage, depending on your use case
  // Redirect to login page or other actions as needed
};


// Assuming you're passing the page and limit from the frontend to the backend
export const fetchAllUsers = async (token, currentPage = 1, usersPerPage = 5) => {
  try {
    const response = await axios.get(`${API_URL}api/users/`, {
      headers: { Authorization: `Bearer ${token}` },
      params: {
        page: currentPage,  // Current page
        limit: usersPerPage, // Number of users per page
      },
    });
    return response.data;  // Expecting { users: [], totalUsers: 0 }
  } catch (error) {
    console.error('Error fetching all users:', error);
    throw error;
  }
};

