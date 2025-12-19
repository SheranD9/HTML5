import React from 'react';
import { useTaskStore } from '../../store/useTaskStore';

// 定数定義
const ROW_HEIGHT = 50;
const DAY_WIDTH = 40;
const HEADER_HEIGHT = 30;
const PROJECT_START = "2025-12-01";

const GanttTimeline = () => {
  const { tasks } = useTaskStore();

  // 日付の差分（日数）を計算する関数
  const getDayOffset = (dateStr) => {
    const start = new Date(PROJECT_START);
    const target = new Date(dateStr);
    const diffTime = target - start;
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  // 全体の幅と高さの計算
  const totalWidth = 30 * DAY_WIDTH;
  const totalHeight = Math.max(tasks.length * ROW_HEIGHT + HEADER_HEIGHT, 400);

  return (
    <div style={{
      backgroundColor: 'white',
      borderRadius: '8px',
      padding: '20px',
      overflowX: 'auto',
      boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
    }}>
      <h3>ガントチャート</h3>

      <svg width={totalWidth} height={totalHeight} style={{ border: '1px solid #eee', marginTop: '10px' }}>

        {/* 背景のグリッド線 */}
        {Array.from({ length: 30 }).map((_, i) => (
          <g key={i}>
            <line
              x1={i * DAY_WIDTH} y1={0}
              x2={i * DAY_WIDTH} y2={totalHeight}
              stroke="#f0f0f0" strokeWidth="1"
            />
            {/* 日付ヘッダー */}
            <text x={i * DAY_WIDTH + 5} y={20} fontSize="10" fill="#999">
              {i + 1}
            </text>
          </g>
        ))}

        {/* タスクバー描画 */}
        {tasks.map((task, index) => {
          const dayOffset = getDayOffset(task.startDate);

          // 座標計算
          const x = dayOffset * DAY_WIDTH;
          const y = index * ROW_HEIGHT + HEADER_HEIGHT + 10;
          const width = task.duration * DAY_WIDTH;
          const height = ROW_HEIGHT - 20;

          // ステータスごとの色分け
          const color = task.status === 'done' ? '#10B981' : // 緑
            task.status === 'inprogress' ? '#3B82F6' : // 青
              '#6B7280'; // グレー

          return (
            <g key={task.id}>
              {/* バー本体 */}
              <rect
                x={x} y={y}
                width={width} height={height}
                fill={color}
                rx="5"
                style={{ cursor: 'pointer' }}
              />

              {/* タスク名 */}
              <text
                x={x + 5}
                y={y + height / 2 + 5}
                fill="white"
                fontSize="12"
                pointerEvents="none"
                style={{ fontWeight: 'bold' }}
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