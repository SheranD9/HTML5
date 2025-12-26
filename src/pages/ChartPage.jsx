import React, { useEffect } from 'react';
import { useTaskStore } from '../store/useTaskStore';

import GanttHeader from '../components/chart/GanttHeader';
import GanttTimeline from '../components/chart/GanttTimeline';
import ChangeLog from '../components/chart/ChangeLog';
import SosButton from '../components/chart/SosButton';

const ChartPage = () => {
  const { isEditing, subscribeTasks } = useTaskStore();

  useEffect(() => {
    const unsubscribe = subscribeTasks();
    return () => unsubscribe();
  }, [subscribeTasks]);

  return (
    <div className="chart-page-container">
      <GanttHeader />
      <div className="main-content">
        <div className={`chart-area ${isEditing ? 'editing-mode' : ''}`}>
          <GanttTimeline />
          <SosButton />
        </div>
        <ChangeLog />
      </div>
    </div>
  );
};

export default ChartPage;