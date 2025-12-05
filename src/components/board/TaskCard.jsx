import React from "react";

const TaskCard = ({ task }) => {
  return (
    <div className="p-3 bg-gray-200 rounded-md shadow-sm">
      {task.title}
    </div>
  );
};

export default TaskCard;
