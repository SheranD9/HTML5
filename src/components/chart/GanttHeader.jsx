import React from 'react';

const GanttHeader = () => {
  return (
    <div className="header-section">
      <div>
        <div className="header-title">Plooty(プロジェクトの名前)</div>
        <div style={{ fontSize: '0.8rem', color: '#666' }}>期間: 2025/12/01〜2025/12/31</div>
      </div>
      <button className="edit-button">編集</button>
    </div>
  );
};

export default GanttHeader;