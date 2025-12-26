// src/components/TaskCard.jsx
import React from "react";
import { useTaskStore } from "../../store/useTaskStore";

const TaskCard = ({ task }) => {
  const toggleSubtask = useTaskStore((s) => s.toggleSubtask);
  const updateTaskStatus = useTaskStore((s) => s.updateTaskStatus);

  return (
    <div className="bg-white p-4 rounded-xl shadow mb-4 w-[700px]">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-semibold mb-1">{task.title}</h3>
          <p className="text-sm text-gray-600">Assigned: {task.assigned}</p>
          <p className="text-sm text-gray-600">Deadline: {task.deadline}</p>
          <p className="text-sm text-gray-600">Tag: {task.tag}</p>
        </div>

        <div className="text-right">
          <select value={task.status} onChange={(e)=>updateTaskStatus(task.id, e.target.value)} className="border rounded p-1">
            <option value="todo">ToDo</option>
            <option value="doing">Doing</option>
            <option value="review">Review</option>
            <option value="done">Done</option>
          </select>
        </div>
      </div>

      <div className="mt-4">
        <div className="w-full bg-gray-300 h-4 rounded-full">
          <div className="bg-gray-700 h-full rounded-full" style={{ width: `${Math.round((task.progress||0)*100)}%` }} />
        </div>
        <div className="text-right mt-1 font-medium">{Math.round((task.progress||0)*100)}%</div>
      </div>

      <div className="mt-4">
        <div className="text-sm font-medium mb-2">Subtasks</div>
        <div className="flex flex-col gap-2">
          {(task.subtasks || []).map(s => (
            <label key={s.id} className="flex items-center gap-2 text-sm">
              <input type="checkbox" checked={s.done} onChange={()=>toggleSubtask(task.id, s.id)} />
              <span className={s.done ? "line-through text-gray-500" : ""}>{s.text}</span>
            </label>
          ))}
          {(!task.subtasks || task.subtasks.length===0) && <div className="text-xs text-gray-400">No subtasks</div>}
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
