import React from "react";
import { useTaskStore } from "../../store/useTaskStore";
import TaskCard from "./TaskCard";

const Column = ({ title, status }) => {
  const { tasks } = useTaskStore();

  const filteredTasks = tasks.filter((task) => task.status === status);

  return (
    <div className="w-1/3 bg-white p-4 rounded-xl shadow" style={{ flex: 1, backgroundColor: 'white', padding: '16px', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
      <h2 className="text-lg font-semibold mb-4" style={{ fontWeight: 'bold', marginBottom: '16px' }}>{title}</h2>

      <div className="flex flex-col gap-3" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {filteredTasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
};

export default Column;