import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import './index.css';

import App from './App.jsx';
// Import components
import Dashboard from './components/Dashboard.jsx';
import Login from './components/Login.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router> */}
    {/* <Dashboard/>   */}
    <App/>
  </StrictMode>
);
