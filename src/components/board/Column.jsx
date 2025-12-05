import React from "react";
import { useShallow } from "zustand/shallow";
import { useTaskStore } from "../../store/useTaskStore";
import TaskCard from "./TaskCard";

const Column = ({ title, status }) => {
  const tasks = useTaskStore(
    useShallow((state) =>
      state.tasks.filter((task) => task.status === status)
    )
  );

  return (
    <div className="w-1/3 bg-white p-4 rounded-xl shadow">
      <h2 className="text-lg font-semibold mb-4">{title}</h2>

      <div className="flex flex-col gap-3">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
};

export default Column;