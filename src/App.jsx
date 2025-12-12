import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import BoardPage from './pages/BoardPage';
import ChartPage from './pages/ChartPage';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path='/' element={<BoardPage />} />

          <Route path='/chart' element={<ChartPage />} />
        </Routes>
      </div>
    </Router>
  )
};
export default App;