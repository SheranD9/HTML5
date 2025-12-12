import React, { useState } from "react";
import StatusTabs from "../components/board/StatusTab";
import TaskCard from "../components/board/TaskCard";
import ChangeLogPanel from "../components/board/ChangeLogPanel";
import SOSButton from "../components/board/SOSButton";
import { useTaskStore } from "../store/useTaskStore";

const BoardPage = () => {
  const status = useTaskStore((s) => s.status);
  const tasks = useTaskStore((s) => s.tasks);
  const filtered = tasks.filter((t) => t.status === status);

  const [openLog, setOpenLog] = useState(true);

  return (
    <div className="flex">
      {/* Main content */}
      <div className="flex-1 p-8">
        <h1 className="text-3xl font-bold">Plooty（プロジェクトの名前）</h1>
        <p className="text-gray-600">期間：○月○日〜○月○日</p>

        <StatusTabs />

        {filtered.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}

        <SOSButton />
      </div>

      {/* Right Log Panel */}
      <ChangeLogPanel open={openLog} onClose={() => setOpenLog(false)} />
    </div>
  );
};

export default BoardPage;
