import React from 'react';
import { useTaskStore } from '../../store/useTaskStore';

const GanttHeader = () => {
  const { isEditing, toggleEditing, addTask } = useTaskStore();

  const handleAddTask = () => {
    const title = window.prompt("新しいタスクの名前を入力してください", "新規タスク");
    if (title) {
      addTask(title);
    }
  };

  return (
    <div className="header-section">
      <div>
        <div className="header-title">Plooty(プロジェクトの名前)</div>
        <div style={{ fontSize: '0.8rem', color: '#666' }}>期間: 2025/12/01〜2025/12/31</div>
      </div>

      <div style={{ display: 'flex', gap: '10px' }}>
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
          className="edit-button"
          onClick={toggleEditing}
          style={{ backgroundColor: isEditing ? '#3B82F6' : '#ef5350' }}
        >
          {isEditing ? '完了' : '編集'}
        </button>
      </div>
    </div>
  );
};

export default GanttHeader;