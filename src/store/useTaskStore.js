import { create } from "zustand";

export const useTaskStore = create((set) => ({
  // 日付(startDate)と期間(duration)を追加したダミーデータ
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
        // 新規タスク作成時もデフォルトの日付を入れる
        {
          id: Date.now().toString(),
          title,
          status: "todo",
          startDate: "2025-12-01",
          duration: 1
        },
      ],
    })),

  updateTaskStatus: (taskId, newStatus) =>
    set((state) => ({
      tasks: state.tasks.map((t) =>
        t.id === taskId ? { ...t, status: newStatus } : t
      ),
    })),
}));