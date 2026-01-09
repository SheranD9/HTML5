import React from "react";

const TaskCard = ({ task }) => {
  return (
    <div className="p-3 bg-gray-200 rounded-md shadow-sm" style={{ padding: '12px', backgroundColor: '#f3f4f6', borderRadius: '6px', boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}>
      <div style={{ fontWeight: 'bold' }}>{task.title}</div>
      <div style={{ fontSize: '0.8rem', color: '#666' }}>
        {task.startDate} ({task.duration}日)
      </div>
    </div>
  );
};

export default TaskCard;