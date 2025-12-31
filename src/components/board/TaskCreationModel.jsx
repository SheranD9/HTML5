import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../config/firebase-config";

const TaskCreationModal = ({ open, onClose, projectId }) => {

  const [title, setTitle] = useState("");
  const [assigned, setAssigned] = useState("");
  const [tag, setTag] = useState("");
  const [status, setStatus] = useState("todo");

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [subtasks, setSubtasks] = useState(()=>[
    { id: Date.now(), text: "" }
  ]);

  if (!open) return null;

  const addSubtask = () => {
    setSubtasks([...subtasks, { id: Date.now(), text: "" }]);
  }

  const updateSubtask = (id, value) => {
    setSubtasks(
      subtasks.map((s) => (s.id === id ? { ...s, text: value } : s))
    );
  };

  const removeSubtask = (id) => {
    setSubtasks(subtasks.filter((s) => s.id !== id));
  };

  const submit = async () => {
    const cleanedSubtasks = subtasks
      .map((s) => s.text.trim())
      .filter(Boolean)
      .map((text, i) => ({
        id: `sub-${Date.now()}-${i}`,
        text,
        done: false
      }));

    await addDoc(collection(db, "tasks"), {
      title,
      assigned,
      tag,
      subtasks: cleanedSubtasks,
      status,
      progress: 0, // New tasks start at 0%
      startDate,
      endDate,
      projectId,
      createdAt: new Date(), // Important for sorting in useTasks
    });
    // reset
    setTitle("");
    setAssigned("");
    setTag("");
    setStatus("todo");
    setStartDate("");
    setEndDate("");
    setSubtasks([{ id: Date.now(), text: "" }]);

    onClose();
  };

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white w-[720px] rounded-xl p-6 shadow-xl">
        <h3 className="text-xl font-semibold mb-4">Create Task</h3>

         {/* Basic info */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm">Title</label>
            <input
              className="w-full border p-2 rounded mt-1"
              value={title}
              onChange={e => setTitle(e.target.value)} />
          </div>
          <div>
            <label className="text-sm">Assigned</label>
            <input
              className="w-full border p-2 rounded mt-1"
              value={assigned}
              onChange={e => setAssigned(e.target.value)} />
          </div>

          <div>
            <label className="text-sm">Tag</label>
            <input
            className="w-full border p-2 rounded mt-1"
              value={tag}
              onChange={e => setTag(e.target.value)} />
          </div>

          <div>
            <label className="text-sm">Status</label>
            <select value={status} onChange={e=>setStatus(e.target.value)} className="block border p-2 rounded mt-1">
              <option value="todo">ToDo</option>
              <option value="doing">Doing</option>
              <option value="review">Review</option>
              <option value="done">Done</option>
            </select>
            </div>
          </div>

          {/* Date range */}
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div>
              <label className="text-sm">Start Day</label>
              <input
                type="date"
                className="w-full border rounded p-2 mt-1"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>

          <div>
            <label className="text-sm">End Day (Deadline) </label>
            <input
              type="date"
              className="w-full border rounded p-2 mt-1"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
        </div>

          {/* Subtasks */}
          <div className="mt-6">
            <label className="text-sm font-medium">Subtasks</label>

            <div className="mt-2 space-y-2">
              {subtasks.map((s, index)=>(
                <div key={s.id} className="flex items-center gap-2">
                  <input
                    className="flex-1 border rounded p-2"
                    placeholder={`Subtask ${index + 1}`}
                    value={s.text}
                    onChange={(e) => updateSubtask(s.id, e.target.value)}
                  />

                  {subtasks.length > 1 && (
                    <button
                      onClick={() => removeSubtask(s.id)}
                      className="text-red-500 text-sm"
                    >
                      ✕
                    </button>
                  )}
              </div>
              ))}
            </div>
            <button
              onClick={addSubtask}
              className="mt-2 text-sm text-blue-600"
            >
              + Add Subtask
            </button>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 mt-6">
            <button
              onClick={onClose}
              className="px-4 py-2 border rounded"
            >
              Cancel
            </button>

            <button
              onClick={submit}
              className="px-4 py-2 bg-blue-600 text-white rounded"
            >Create Task</button>
          </div>
        </div>
    </div >
  );
};

export default TaskCreationModal;
