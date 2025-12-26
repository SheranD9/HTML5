import React from 'react';
import { useTaskStore } from '../../store/useTaskStore';

const GanttHeader = () => {
  const { isEditing, toggleEditing } = useTaskStore();

  return (
    <div className="header-section">
      <div>
        <div className="header-title">Plooty(プロジェクトの名前)</div>
        <div style={{ fontSize: '0.8rem', color: '#666' }}>期間: 2025/12/01〜2025/12/31</div>
      </div>

      {/* ボタンをクリックで切り替え */}
      <button
        className="edit-button"
        onClick={toggleEditing}
        style={{
          // 編集モード中は青色に
          backgroundColor: isEditing ? '#3B82F6' : '#ef5350'
        }}
      >
        {isEditing ? '完了' : '編集'}
      </button>
    </div>
  );
};

export default GanttHeader;