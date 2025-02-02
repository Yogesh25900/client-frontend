import { useState } from 'react';
import { loginUser } from '../api/AuthService';
import { useNavigate } from 'react-router-dom';
import './Login.css'
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    
    try {
      const response = await loginUser(email, password);  // Call the loginUser function
      console.log(response);  // Log the response data (optional)
      navigate('/dashboard');  // Redirect to the dashboard after login
    } catch (error) {
      console.error('Login failed:', error.message);  // Display error message
    }
  };
  return (
    <form onSubmit={handleLogin}>
      <input
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
      />
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
