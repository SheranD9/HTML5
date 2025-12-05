import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import BoardPage from './pages/BoardPage';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path='/' element={<BoardPage />} />
        </Routes>
    </div>
    </Router>
  )
};

export default App;