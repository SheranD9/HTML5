import React from 'react';

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

export default ChangeLog;