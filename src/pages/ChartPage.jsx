import React from 'react';
// import { FaTimes } from 'react-icons/fa';

// ヘッダー部品
const GanttHeader = () => {
  return (
    <div className="header-section">
      <div>
        <div className="header-title">Plooty(プロジェクトの名前)</div>
        <div style={{ fontSize: '0.8rem', color: '#666' }}>期間: 〇月〇日〜〇月〇日</div>
      </div>
      <button className="edit-button">編集</button>
    </div>
  );
};

// サイドバー部品
const ChangeLog = () => {
  // ダミーデータ
  const logs = Array(10).fill("yyyy/mm/dd 変更しましたとかの通知");

  return (
    <div className="sidebar-area">
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <h2>変更ログ</h2>
        <button style={{ background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer' }}>×</button>
      </div>

      {logs.map((log, index) => (
        <div key={index} style={{ marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'white' }}></div>
          <div style={{ fontSize: '0.8rem', color: '#333' }}>{log}</div>
        </div>
      ))}
    </div>
  );
};

// チャート本体
const GanttTimeline = () => {
  return (
    <div style={{
      minWidth: '800px',
      minHeight: '400px',
      backgroundColor: 'white',
      borderRadius: '8px',
      padding: '20px'
    }}>
      <h3>ここにガントチャートが入ります</h3>
      <p>（手順4でここにSVGを描画します）</p>
    </div>
  );
};

const ChartPage = () => {
  return (
    <div className="chart-page-container">
      {/* 1. ヘッダー */}
      <GanttHeader />

      {/* 2. メインエリア */}
      <div className="main-content">

        {/* 左側：チャート */}
        <div className="chart-area">
          <GanttTimeline />
          {/* SOSボタン */}
          <button className="sos-button">SOS</button>
        </div>

        {/* 右側：サイドバー */}
        <ChangeLog />

      </div>
    </div>
  );
};

export default ChartPage;