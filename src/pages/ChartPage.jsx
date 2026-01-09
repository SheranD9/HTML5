import React, { useEffect, useState } from 'react';
import { useTaskStore } from '../store/useTaskStore';

import GanttHeader from '../components/chart/GanttHeader';
import GanttTimeline from '../components/chart/GanttTimeline';
import ChangeLog from '../components/chart/ChangeLog';
import SosButton from '../components/chart/SosButton';

const ChartPage = () => {
  const { isEditing, subscribeTasks } = useTaskStore();
  const [showLog, setShowLog] = useState(false);

  useEffect(() => {
    const unsubscribe = subscribeTasks();
    return () => unsubscribe();
  }, [subscribeTasks]);

  return (
    <div className="chart-page-container">
      <GanttHeader onToggleLog={() => setShowLog(true)} />
      <div className="main-content">
        <div className={`chart-area ${isEditing ? 'editing-mode' : ''}`}>
          <GanttTimeline />
          <SosButton />
        </div>
        {showLog && (
          <ChangeLog onClose={() => setShowLog(false)} />
        )}
      </div>
    </div>
  );
};

export default ChartPage;