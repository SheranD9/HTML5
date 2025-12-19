// src/components/ModeToggle.jsx
import React from "react";
import { useTaskStore } from "../../store/useTaskStore";

const ModeToggle = () => {
  const mode = useTaskStore(s => s.mode);
  const setMode = useTaskStore(s => s.setMode);

  return (
    <div className="flex items-center gap-3 mb-4">
      <button onClick={()=>setMode("list")} className={`px-4 py-2 rounded ${mode==="list" ? "bg-gray-800 text-white" : "bg-gray-200"}`}>List</button>
      <button onClick={()=>setMode("timeline")} className={`px-4 py-2 rounded ${mode==="timeline" ? "bg-gray-800 text-white" : "bg-gray-200"}`}>Timeline</button>
    </div>
  );
};

export default ModeToggle;
