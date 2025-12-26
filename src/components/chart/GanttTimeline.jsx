import React, { useState, useRef, useEffect } from 'react';
import { useTaskStore } from '../../store/useTaskStore';
import { addDays, format, differenceInCalendarDays, parseISO } from 'date-fns';

const ROW_HEIGHT = 50;
const DAY_WIDTH = 40;
const HEADER_HEIGHT = 30;
const PROJECT_START = "2025-12-01";

const GanttTimeline = () => {
  const { tasks, updateTaskDate, updateTaskDuration, isEditing, deleteTask, updateTaskTitle } = useTaskStore();

  const [interaction, setInteraction] = useState({ type: null, taskId: null });
  const [dragStartX, setDragStartX] = useState(0);
  const [currentDragX, setCurrentDragX] = useState(0);

  const svgRef = useRef(null);

  const handleMouseDown = (e, task, type) => {
    if (!isEditing) return;
    e.preventDefault();
    e.stopPropagation();
    setInteraction({ type, taskId: task.id });
    setDragStartX(e.clientX);
    setCurrentDragX(0);
  };

  const handleDoubleClick = (task) => {
    if (!isEditing) return;
    const newTitle = window.prompt("タスク名を変更:", task.title);
    if (newTitle) {
      updateTaskTitle(task.id, newTitle);
    }
  };

  const handleDelete = (e, taskId) => {
    e.stopPropagation();
    deleteTask(taskId);
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!interaction.type) return;
      const delta = e.clientX - dragStartX;
      setCurrentDragX(delta);
    };

    const handleMouseUp = () => {
      if (!interaction.type) return;

      const moveDays = Math.round(currentDragX / DAY_WIDTH);
      const task = tasks.find(t => t.id === interaction.taskId);

      if (task) {
        if (interaction.type === 'drag') {
          let newDate = addDays(parseISO(task.startDate), moveDays);

          if (differenceInCalendarDays(newDate, parseISO(PROJECT_START)) < 0) {
            newDate = parseISO(PROJECT_START);
          }
          const maxStartDay = 30 - task.duration;
          if (differenceInCalendarDays(newDate, parseISO(PROJECT_START)) > maxStartDay) {
            newDate = addDays(parseISO(PROJECT_START), maxStartDay);
          }
          updateTaskDate(task.id, format(newDate, 'yyyy-MM-dd'));

        } else if (interaction.type === 'resize') {
          const currentDayOffset = getDayOffset(task.startDate);
          const maxDuration = 30 - currentDayOffset;
          let newDuration = task.duration + moveDays;
          newDuration = Math.min(Math.max(1, newDuration), maxDuration);
          updateTaskDuration(task.id, newDuration);
        }
      }
      setInteraction({ type: null, taskId: null });
      setCurrentDragX(0);
    };

    if (interaction.type) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [interaction, dragStartX, tasks, updateTaskDate, updateTaskDuration, currentDragX]);

  const getDayOffset = (dateStr) => {
    return differenceInCalendarDays(parseISO(dateStr), parseISO(PROJECT_START));
  };

  const totalWidth = 30 * DAY_WIDTH;
  const totalHeight = Math.max(tasks.length * ROW_HEIGHT + HEADER_HEIGHT, 400);

  return (
    <div style={{ backgroundColor: 'white', borderRadius: '8px', padding: '20px', overflowX: 'auto', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}>
      <h3>ガントチャート{isEditing ? '（編集中... ダブルクリックで名前変更）' : ''}</h3>
      <svg ref={svgRef} width={totalWidth} height={totalHeight} style={{ border: '1px solid #eee', marginTop: '10px', userSelect: 'none' }}>
        {Array.from({ length: 30 }).map((_, i) => (
          <g key={i}>
            <line x1={i * DAY_WIDTH} y1={0} x2={i * DAY_WIDTH} y2={totalHeight} stroke="#f0f0f0" strokeWidth="1" />
            <text x={i * DAY_WIDTH + 5} y={20} fontSize="10" fill="#999">{i + 1}</text>
          </g>
        ))}
        {tasks.map((task, index) => {
          const isInteracting = interaction.taskId === task.id;
          const dayOffset = getDayOffset(task.startDate);
          let x = dayOffset * DAY_WIDTH;
          let width = task.duration * DAY_WIDTH;

          if (isInteracting) {
            if (interaction.type === 'drag') {
              x += currentDragX;
            } else if (interaction.type === 'resize') {
              width += currentDragX;
            }
          }
          x = Math.max(0, x);
          if (interaction.type === 'resize') {
            const maxWidth = totalWidth - x;
            width = Math.min(Math.max(DAY_WIDTH, width), maxWidth);
          } else {
            x = Math.min(totalWidth - width, x);
          }
          const y = index * ROW_HEIGHT + HEADER_HEIGHT + 10;
          const height = ROW_HEIGHT - 20;
          const color = task.status === 'done' ? '#10B981' : task.status === 'inprogress' ? '#3B82F6' : '#6B7280';

          return (
            <g key={task.id} onDoubleClick={() => handleDoubleClick(task)}>
              <rect
                x={x} y={y} width={width} height={height} fill={color} rx="5"
                opacity={isInteracting ? 0.8 : 1}
                style={{ cursor: isEditing ? 'grab' : 'default' }}
                onMouseDown={(e) => handleMouseDown(e, task, 'drag')}
              />
              <text x={x + 5} y={y + height / 2 + 5} fill="white" fontSize="12" pointerEvents="none" fontWeight="bold">
                {task.title}
              </text>
              {isEditing && (
                <>
                  <rect
                    x={x + width - 10} y={y} width={10} height={height} fill="black" opacity="0.1"
                    style={{ cursor: 'ew-resize' }}
                    onMouseDown={(e) => handleMouseDown(e, task, 'resize')}
                  />
                  <circle
                    cx={x + width} cy={y} r="8" fill="red" stroke="white" strokeWidth="1"
                    style={{ cursor: 'pointer' }}
                    onClick={(e) => handleDelete(e, task.id)}
                  />
                  <text
                    x={x + width} y={y + 3} textAnchor="middle" fill="white" fontSize="10" fontWeight="bold" pointerEvents="none"
                  >
                    ×
                  </text>
                </>
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
};

export default GanttTimeline;