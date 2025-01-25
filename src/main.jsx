import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App/>
    {/* <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home/*" element={<Home />} /> {/* Ensure this catches all routes under /home */}
      {/* </Routes> */}
    {/* </Router> */}
  </StrictMode>
);
