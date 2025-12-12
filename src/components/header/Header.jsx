import React from "react";

function GanttHeader() {
  return (
    <div className="header-section">
      <div>
        <div className="header-title">Plooty(プロジェクトの名前)</div>
        <div style={{ fontSize: "0.8rem", color: "#666" }}>
          期間: 2025/12/01〜2025/12/31
        </div>
      </div>
      <div>
        <button className="edit-button">編集</button>
        <button className="change-button">切り替え</button>
      </div>
    </div>
  );
}

export default GanttHeader;
