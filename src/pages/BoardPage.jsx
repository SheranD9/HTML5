import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Column from "../components/board/Column";
import { useTaskStore } from "../store/useTaskStore";
import ChangeLog from "../components/chart/ChangeLog";

const BoardPage = () => {
  const { subscribeTasks, isEditing, toggleEditing, addTask } = useTaskStore();
  const navigate = useNavigate();
  const [showLog, setShowLog] = useState(false);

  useEffect(() => {
    const unsubscribe = subscribeTasks();
    return () => unsubscribe();
  }, [subscribeTasks]);

  const handleAddTask = () => {
    const title = window.prompt("新しいタスクの名前を入力してください", "新規タスク");
    if (title) {
      addTask(title);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', backgroundColor: '#f3f4f6' }}>

      <div className="header-section" style={{
        height: '60px',
        backgroundColor: '#ffffff',
        borderBottom: '1px solid #ddd',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 20px',
        flexShrink: 0
      }}>
        <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Plooty ボード</div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={() => navigate('/chart')}
            style={{
              backgroundColor: '#fff',
              color: '#333',
              border: '1px solid #ccc',
              padding: '8px 16px',
              borderRadius: '20px',
              fontSize: '1rem',
              cursor: 'pointer'
            }}
          >
            ガントチャートへ
          </button>

          <button
            onClick={() => setShowLog(true)}
            style={{
              backgroundColor: '#fff',
              color: '#333',
              border: '1px solid #ccc',
              padding: '8px 16px',
              borderRadius: '20px',
              fontSize: '1rem',
              cursor: 'pointer'
            }}
          >
            変更ログ
          </button>

          {isEditing && (
            <button
              onClick={handleAddTask}
              style={{
                backgroundColor: '#10B981',
                color: 'white',
                border: 'none',
                padding: '8px 24px',
                borderRadius: '20px',
                fontSize: '1rem',
                cursor: 'pointer',
                fontWeight: 'bold'
              }}
            >
              ＋ 追加
            </button>
          )}

          <button
            onClick={toggleEditing}
            style={{
              backgroundColor: isEditing ? '#3B82F6' : '#ef5350',
              color: 'white',
              border: 'none',
              padding: '8px 24px',
              borderRadius: '20px',
              fontSize: '1rem',
              cursor: 'pointer'
            }}
          >
            {isEditing ? '完了' : '編集'}
          </button>
        </div>
      </div>

      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        <div style={{ display: 'flex', gap: '20px', padding: '20px', flex: 1, overflowX: 'auto' }}>
          <Column title="To Do" status="todo" />
          <Column title="In Progress" status="inprogress" />
          <Column title="Done" status="done" />
        </div>

        {showLog && (
          <ChangeLog onClose={() => setShowLog(false)} />
        )}
      </div>
    </div>
  );
};

export default BoardPage;