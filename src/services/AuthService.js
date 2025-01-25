import axios from 'axios';

const API_URL = 'http://localhost:3000/'; // Match your backend URL

// Register a new user
export const registerUser = (userData) => {
  return axios.post(`${API_URL}api/users/signup`, userData); // Register endpoint
};

// Login a user
export const loginUser = (userData) => {
  return axios.post(`${API_URL}api/users/login`, userData); // Login endpoint
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
