// src/components/TimelineGrid.jsx
import React from "react";
import { useTaskStore } from "../../store/useTaskStore";

const sampleDates = ["10日 (水)","11日 (木)","12日 (金)","13日 (土)","14日 (日)","15日 (月)","16日 (火)"];

const TimelineGrid = () => {
  const tasks = useTaskStore(s => s.tasks);
  // show all tasks for timeline style
  return (
    <div className="bg-white p-4 rounded-xl shadow">
      <div className="text-center font-medium mb-3">12月</div>

      <div className="grid grid-cols-7 border-b">
        {sampleDates.map((d, idx)=>
          <div key={d} className="py-4 text-center bg-gray-100 border-r text-sm">{d}</div>
        )}
      </div>

      <div className="relative h-96">
        {tasks.map((t, i) => {
          const top = i * 70 + 12;
          const leftPct = (t.startDayIndex / (sampleDates.length)) * 100;
          const widthPct = ((t.endDayIndex - t.startDayIndex + 1) / sampleDates.length) * 100;
          return (
            <div key={t.id} style={{ top, left: `${leftPct}%`, width: `${widthPct}%` }} className="absolute bg-sky-400 text-white p-3 rounded-md shadow">
              <div className="flex items-center justify-between gap-2">
                <div className="font-semibold">{t.title}</div>
                <div className="w-5 h-5 border rounded bg-white" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TimelineGrid;