import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserInfo from './components/UserInfo';
import QuoteContainer from './components/QuoteContainer';
import Navigation from './components/Navigation';
import { quotes } from './components/quote';
import Task from './pages/Task';
import Goals from './pages/Goals';
import Accomplished from './pages/Accomplished';
import './App.css';

function App() {
  const date = new Date();
  const dayOfYear = Math.floor(
    (date - new Date(date.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24
  );
  const quoteOfTheDay = quotes[dayOfYear % quotes.length];

  return (
    <Router>
      <div className="static-top container-fluid lining"> </div>
      <UserInfo />
      <Navigation />
      <div className="content">
        <Routes>
          <Route path="/" element={<Task />} end/>
          <Route path="/goals" element={<Goals />} />
          <Route path="/accomplished" element={<Accomplished />} />
        </Routes>
      </div>
      <QuoteContainer quoteText={quoteOfTheDay} />
    </Router>
  );
}

export default App;
