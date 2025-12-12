import React from 'react';
import GanttHeader from '../components/chart/GanttHeader';
import GanttTimeline from '../components/chart/GanttTimeline';
import ChangeLog from '../components/chart/ChangeLog';
import SosButton from '../components/chart/SosButton';

const ChartPage = () => {
  return (
    <div className="chart-page-container">
      {/* 1. ヘッダー */}
      <GanttHeader />

      {/* 2. メインエリア */}
      <div className="main-content">

        {/* 左側：チャートエリア */}
        <div className="chart-area">
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