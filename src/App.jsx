import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import BoardPage from "./pages/BoardPage";
import ChartPage from "./pages/ChartPage";
import Header from "./components/Header/header.jsx";

function App() {
  return (
    <Router>
      <div className="app-container">
        <Header />

        <Routes>
          <Route path="/" element={<BoardPage />} />

          <Route path="/chart" element={<ChartPage />} />
        </Routes>
      </div>
    </Router>
  );
}
export default App;
