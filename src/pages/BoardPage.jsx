import React, { useState, useEffect } from "react";
import ModeToggle from "../components/board/MoodToggle";
import StatusTabs from "../components/board/StatusTab";
import TaskCard from "../components/board/TaskCard";
import TimelineGrid from "../components/board/TimelineGrid";
import TaskCreationModal from "../components/board/TaskCreationModel";
import ChangeLogPanel from "../components/board/ChangeLogPanel";
import SOSButton from "../components/board/SOSButton";
import { useTaskStore } from "../store/useTaskStore";
import useTasks from "../hooks/useTasks";

const PROJECT_ID = "web-app-1fb26"; // Replace with your actual project ID

const BoardPage = () => {
  const [openCreate, setOpenCreate] = useState(false);
  const [openLog, setOpenLog] = useState(false);

  // 1. Fetch data from Firebase using your hook
  const { tasks: firestoreTasks } = useTasks(PROJECT_ID);

  const mode = useTaskStore(s => s.mode);
  const statusFilter = useTaskStore(s => s.statusFilter);
  const tasks = useTaskStore(s => s.tasks);
  const setStoreTasks = useTaskStore(s => s.setTasks);
  const filtered = tasks.filter(t => t.status === statusFilter);

  // 2. Sync Firebase data into the Zustand store whenever it changes
  useEffect(() => {
    if (firestoreTasks) {
      setStoreTasks(firestoreTasks);
    }
  }, [firestoreTasks, setStoreTasks]);

  return (
    <div className="flex">
      <div className="flex-1 p-8 bg-[#f4f7fb] min-h-screen">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Plooty（プロジェクトの名前）</h1>
            <p className="text-sm text-gray-600">期間：○月○日〜○月○日</p>
          </div>

          <div className="flex items-center gap-3">
            <button onClick={()=>setOpenCreate(true)} className="px-4 py-2 bg-blue-600 text-white rounded">＋ Add Task</button>
            <button onClick={()=>setOpenLog(v=>!v)} className="px-3 py-2 border rounded">変更ログ</button>
          </div>
        </div>

        <ModeToggle />

        {mode === "list" ? (
          <>
            <StatusTabs />
            <div className="mt-4">
              {filtered.map(task=> <TaskCard key={task.id} task={task} />)}
            </div>
            <div className="mt-6">
              <SOSButton />
            </div>
          </>
        ) : (
          <>
            <div className="mb-4">
              <TimelineGrid />
            </div>
          </>
        )}
      </div>

      <ChangeLogPanel open={openLog} onClose={() => setOpenLog(false)} />

      <TaskCreationModal
        open={openCreate}
        onClose={()=>setOpenCreate(false)}
        projectId={PROJECT_ID}
      />
    </div>
  );
};

export default BoardPage;
