import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './Home';
import Login from './Login';

const App: React.FC = () => {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  return (
    <Router>
      <Routes>
        {!isLoggedIn && <Route path="/" element={<Login />} />}
        {isLoggedIn && <Route path="/" element={<Navigate to="/home" />} />}
        <Route path="/home" element={<Home />} />
      </Routes>
    </Router>
  );
};

export default App;
