import React, { useEffect } from "react";
import Column from "../components/board/Column";
import { useTaskStore } from "../store/useTaskStore";

const BoardPage = () => {
  // ストアから自動同期用の関数を取得
  const { subscribeTasks } = useTaskStore();

  // 画面が表示されたらFirebase同期を開始
  useEffect(() => {
    const unsubscribe = subscribeTasks();
    return () => unsubscribe();
  }, [subscribeTasks]);

  return (
    <div className="flex gap-4 p-6 h-screen bg-gray-100" style={{ display: 'flex', gap: '20px', padding: '20px', height: '100vh', backgroundColor: '#f3f4f6' }}>
      {/* 3つのステータス列を表示 */}
      <Column title="To Do" status="todo" />
      <Column title="In Progress" status="inprogress" />
      <Column title="Done" status="done" />
    </div>
  );
};

export default BoardPage;