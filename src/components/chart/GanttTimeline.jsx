import React from 'react';

// --- 設定値 ---
const ROW_HEIGHT = 50;
const DAY_WIDTH = 40;
const HEADER_HEIGHT = 30;

// --- ダミーデータ---
const mockTasks = [
  { id: "1", title: "要件定義", startDay: 0, duration: 5, row: 0 },
  { id: "2", title: "UIデザイン", startDay: 2, duration: 4, row: 1 },
  { id: "3", title: "実装", startDay: 6, duration: 8, row: 2 },
  { id: "4", title: "テスト", startDay: 12, duration: 3, row: 3 },
];

const GanttTimeline = () => {
  // 全体の幅を計算
  const totalWidth = 20 * DAY_WIDTH;
  const totalHeight = mockTasks.length * ROW_HEIGHT + HEADER_HEIGHT;

  return (
    <div style={{
      backgroundColor: 'white',
      borderRadius: '8px',
      padding: '20px',
      overflowX: 'auto',
      boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
    }}>
      <h3>ガントチャート</h3>

      {/* SVG描画エリア */}
      <svg width={totalWidth} height={totalHeight} style={{ border: '1px solid #eee', marginTop: '10px' }}>

        {/* 1. 背景のグリッド線を描く */}
        {Array.from({ length: 20 }).map((_, dayIndex) => (
          <line
            key={dayIndex}
            x1={dayIndex * DAY_WIDTH}
            y1={0}
            x2={dayIndex * DAY_WIDTH}
            y2={totalHeight}
            stroke="#f0f0f0"
            strokeWidth="1"
          />
        ))}

        {/* 2. タスクバーを描く */}
        {mockTasks.map((task) => {
          // 座標計算
          const x = task.startDay * DAY_WIDTH;
          const y = task.row * ROW_HEIGHT + HEADER_HEIGHT + 10;
          const width = task.duration * DAY_WIDTH;
          const height = ROW_HEIGHT - 20;

          return (
            <g key={task.id}>
              {/* バー本体 */}
              <rect
                x={x}
                y={y}
                width={width}
                height={height}
                fill="#4F46E5"
                rx="5"
                style={{ cursor: 'pointer' }}
              />
              {/* タスク名のテキスト */}
              <text
                x={x + 5}
                y={y + height / 2 + 5}
                fill="white"
                fontSize="12"
                pointerEvents="none"
              >
                {task.title}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
};

export default GanttTimeline;