import React from "react";

const TaskCard = ({ task }) => {
  return (
    <div className="bg-white p-4 rounded-xl shadow mb-4 w-[600px]">
      <h3 className="text-lg font-semibold mb-1">{task.title}</h3>

      <p className="text-sm text-gray-600">Assigned: {task.assigned}</p>
      <p className="text-sm text-gray-600">
        Deadline: {task.deadline}
      </p>
      <p className="text-sm text-gray-600 mb-3">Tag: {task.tag}</p>

      <div className="w-full bg-gray-300 h-4 rounded-full">
        <div
          className="bg-gray-700 h-full rounded-full"
          style={{ width: `${task.progress * 100}%` }}
        ></div>
      </div>

      <p className="text-right text-gray-700 mt-1 font-medium">
        {Math.floor(task.progress * 100)}%
      </p>
    </div>
  );
};

export default TaskCard;
