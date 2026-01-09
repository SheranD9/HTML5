import React from "react";
import { useTaskStore } from "../../store/useTaskStore";

const TaskCard = ({ task }) => {
  const { isEditing, deleteTask, updateTaskTitle } = useTaskStore();

  const handleDelete = (e) => {
    e.stopPropagation();
    deleteTask(task.id);
  };

  const handleDoubleClick = () => {
    if (!isEditing) return;
    const newTitle = window.prompt("タスク名を変更:", task.title);
    if (newTitle) {
      updateTaskTitle(task.id, newTitle);
    }
  };

  return (
    <div
      onDoubleClick={handleDoubleClick}
      className="p-3 bg-gray-200 rounded-md shadow-sm"
      style={{
        padding: '12px',
        backgroundColor: '#f3f4f6',
        borderRadius: '6px',
        boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
        position: 'relative',
        cursor: isEditing ? 'pointer' : 'default',
        border: isEditing ? '1px dashed #999' : 'none'
      }}
    >
      <div style={{ fontWeight: 'bold', marginRight: '20px' }}>{task.title}</div>
      <div style={{ fontSize: '0.8rem', color: '#666' }}>
        {task.startDate} ({task.duration}日)
      </div>

      {isEditing && (
        <button
          onClick={handleDelete}
          style={{
            position: 'absolute',
            top: '5px',
            right: '5px',
            width: '20px',
            height: '20px',
            borderRadius: '50%',
            backgroundColor: '#ef5350',
            color: 'white',
            border: 'none',
            fontSize: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer'
          }}
        >
          ×
        </button>
      )}
    </div>
  );
};

export default TaskCard;