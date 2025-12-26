// src/components/StatusTabs.jsx
import React from "react";
import { useTaskStore } from "../../store/useTaskStore";

const statuses = [
  { key: "todo", label: "ToDo" },
  { key: "doing", label: "Doing" },
  { key: "review", label: "Review" },
  { key: "done", label: "Done" },
];

const StatusTabs = () => {
  const statusFilter = useTaskStore(s => s.statusFilter);
  const setStatus = useTaskStore(s => s.setStatus);
  const tasks = useTaskStore(s => s.tasks);

  return (
    <div className="flex gap-4 mt-4 mb-6">
      {statuses.map(s => {
        const count = tasks.filter(t => t.status === s.key).length;
        const active = statusFilter === s.key;
        return (
          <button key={s.key} onClick={()=>setStatus(s.key)} className={`px-4 py-2 rounded-full ${active ? "bg-gray-800 text-white" : "bg-gray-200 text-gray-700"}`}>
            {s.label}({count})
          </button>
        );
      })}
    </div>
  );
};

export default StatusTabs;
