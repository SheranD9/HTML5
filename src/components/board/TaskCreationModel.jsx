// src/components/TaskCreationModal.jsx
import React, { useState } from "react";
import { useTaskStore } from "../../store/useTaskStore";

const TaskCreationModal = ({ open, onClose }) => {
  const addTask = useTaskStore((s) => s.addTask);
  const [title, setTitle] = useState("");
  const [assigned, setAssigned] = useState("");
  const [deadline, setDeadline] = useState("");
  const [tag, setTag] = useState("");
  const [subtasksText, setSubtasksText] = useState(""); // newline separated
  const [status, setStatus] = useState("todo");
  const [startDayIndex, setStartDayIndex] = useState(0);
  const [endDayIndex, setEndDayIndex] = useState(0);

  const submit = () => {
    const subs = subtasksText
      .split("\n")
      .map((s) => s.trim())
      .filter(Boolean);
    addTask({
      title,
      assigned,
      deadline,
      tag,
      subtasks: subs,
      status,
      startDayIndex: Number(startDayIndex),
      endDayIndex: Number(endDayIndex),
    });
    // reset
    setTitle("");
    setAssigned("");
    setDeadline("");
    setTag("");
    setSubtasksText("");
    setStatus("todo");
    setStartDayIndex(0);
    setEndDayIndex(0);
    onClose();
  };

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white w-[720px] rounded-lg p-6 shadow-xl">
        <h3 className="text-xl font-semibold mb-4">Create Task</h3>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm">Title</label>
            <input value={title} onChange={e=>setTitle(e.target.value)} className="w-full border p-2 rounded mt-1"/>
          </div>
          <div>
            <label className="text-sm">Assigned</label>
            <input value={assigned} onChange={e=>setAssigned(e.target.value)} className="w-full border p-2 rounded mt-1"/>
          </div>

          <div>
            <label className="text-sm">Deadline</label>
            <input value={deadline} onChange={e=>setDeadline(e.target.value)} placeholder="20 DEC 2025" className="w-full border p-2 rounded mt-1"/>
          </div>

          <div>
            <label className="text-sm">Tag</label>
            <input value={tag} onChange={e=>setTag(e.target.value)} className="w-full border p-2 rounded mt-1"/>
          </div>
        </div>

        <div className="mt-4">
          <label className="text-sm">Subtasks (one per line)</label>
          <textarea value={subtasksText} onChange={e=>setSubtasksText(e.target.value)} className="w-full h-24 border p-2 rounded mt-1" placeholder={"Wireframe\nMockup\nHandoff"} />
        </div>

        <div className="mt-4 flex gap-4 items-end">
          <div>
            <label className="text-sm">Status</label>
            <select value={status} onChange={e=>setStatus(e.target.value)} className="block border p-2 rounded mt-1">
              <option value="todo">todo</option>
              <option value="doing">doing</option>
              <option value="review">review</option>
              <option value="done">done</option>
            </select>
          </div>

          <div>
            <label className="text-sm">Start day index (timeline)</label>
            <input type="number" value={startDayIndex} onChange={e=>setStartDayIndex(e.target.value)} className="w-28 border p-2 rounded mt-1"/>
          </div>
          <div>
            <label className="text-sm">End day index (timeline)</label>
            <input type="number" value={endDayIndex} onChange={e=>setEndDayIndex(e.target.value)} className="w-28 border p-2 rounded mt-1"/>
          </div>

          <div className="ml-auto flex gap-2">
            <button onClick={onClose} className="px-4 py-2 rounded border">Cancel</button>
            <button onClick={submit} className="px-4 py-2 rounded bg-blue-600 text-white">Create</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskCreationModal;
