import React from 'react';
import { useTaskStore } from '../../store/useTaskStore';

const ChangeLog = () => {
  const { logs } = useTaskStore();

  return (
    <div className="sidebar-area">
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <h2>変更ログ</h2>
        <button style={{ background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer' }}>×</button>
      </div>
      {logs.length === 0 && (
        <p style={{ color: '#999', fontSize: '0.9rem' }}>まだ通知はありません</p>
      )}
      {logs.map((log) => (
        <div key={log.id} style={{ marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'white', flexShrink: 0 }}></div>
          <div>
            <div style={{ fontSize: '0.7rem', color: '#666' }}>{log.time}</div>
            <div style={{ fontSize: '0.8rem', color: '#333' }}>{log.message}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChangeLog;