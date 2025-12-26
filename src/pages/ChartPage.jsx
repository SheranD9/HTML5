import React from 'react';
import { useTaskStore } from '../store/useTaskStore'; // ★追加

import GanttHeader from '../components/chart/GanttHeader';
import GanttTimeline from '../components/chart/GanttTimeline';
import ChangeLog from '../components/chart/ChangeLog';
import SosButton from '../components/chart/SosButton';

const ChartPage = () => {
  const { isEditing } = useTaskStore();

  return (
    <div className="chart-page-container">
      {/* 1. ヘッダー */}
      <GanttHeader />

      {/* 2. メインエリア */}
      <div className="main-content">

        {/* 左側：チャートエリア */}
        <div className={`chart-area ${isEditing ? 'editing-mode' : ''}`}>
          <GanttTimeline />
          <SosButton />
        </div>

        {/* 右側：サイドバー */}
        <ChangeLog />

      </div>
    </div>
  );
};

export default ChartPage;