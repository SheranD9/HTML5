import React, { useState } from "react";
import { Link } from "react-router-dom";

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Toggle Button */}
      <button className="sidebar-toggle" onClick={toggleSidebar}>
        {isOpen ? "✖" : "☰"}
      </button>

      {/* Sidebar */}
      <div className={`sidebar ${isOpen ? "open" : ""}`}>
        <h2 className="sidebar-title">Menu</h2>
        <ul>
          <li>
            <Link to="/" onClick={toggleSidebar}>
              Board
            </Link>
          </li>
          <li>
            <Link to="/chart" onClick={toggleSidebar}>
              Chart
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
}

export default Sidebar;
