// src/store/useTaskStore.js
import { create } from "zustand";

export const useTaskStore = create((set) => ({
  logs: [],
  isEditing: false,

  tasks: [
    { id: "1", title: "要件定義", status: "done", startDate: "2025-12-01", duration: 3 },
    { id: "2", title: "UIデザイン", status: "inprogress", startDate: "2025-12-04", duration: 5 },
    { id: "3", title: "実装", status: "todo", startDate: "2025-12-10", duration: 7 },
    { id: "4", title: "テスト", status: "todo", startDate: "2025-12-18", duration: 4 },
  ],

  addTask: (title) =>
    set((state) => ({
      tasks: [
        ...state.tasks,
        {
          id: Date.now().toString(),
          title,
          status: "todo",
          startDate: "2025-12-01",
          duration: 1
        },
      ],
    })),

  toggleEditing: () => set((state) => ({ isEditing: !state.isEditing })),

  addLog: (message) =>
    set((state) => {
      const now = new Date();
      // 日付を "12/05 14:30" のような形式にする
      const timeStr = `${now.getMonth() + 1}/${now.getDate()} ${now.getHours()}:${String(now.getMinutes()).padStart(2, '0')}`;

      return {
        logs: [
          { id: Date.now(), message, time: timeStr }, // 新しいログを先頭に追加
          ...state.logs,
        ],
      };
    }),

  updateTaskStatus: (taskId, newStatus) =>
    set((state) => ({
      tasks: state.tasks.map((t) =>
        t.id === taskId ? { ...t, status: newStatus } : t
      ),
    })),

  updateTaskDate: (taskId, newStartDate) =>
    set((state) => ({
      tasks: state.tasks.map((t) =>
        t.id === taskId ? { ...t, startDate: newStartDate } : t
      ),
    })),

  //期間を更新する
  updateTaskDuration: (taskId, newDuration) =>
    set((state) => ({
      tasks: state.tasks.map((t) =>
        t.id === taskId ? { ...t, duration: Math.max(1, newDuration) } : t
      ),
    })),
}));
