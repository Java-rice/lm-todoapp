import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/header/Header';
import User from './components/user/User';
import Task from './pages/Task';
import Goals from './pages/Goals';
import Accomplished from './pages/Accomplished';

import './App.css';

function App() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <Router className="container-fluid router__cont">
      <Header />
      {!isMobile && <User />}
      <div className={`content ${isMobile ? 'content-mobile' : ''}`}>
        <Routes>
          <Route path="/" element={<Task />} />
          <Route path="/goals" element={<Goals />} />
          <Route path="/accomplished" element={<Accomplished />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
